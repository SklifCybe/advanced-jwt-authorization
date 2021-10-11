const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/User');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');

const salt = parseInt(process.env.SALT);

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email = ${email} has been exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const activationLink = uuid.v4();

    const user = await UserModel.create({ email, password: hashedPassword, activationLink });
    await mailService.sendActivationMail(
      email,
      `${process.env.SERVER_URL}/api/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink});
    if (!user) {
      throw ApiError.BadRequest('Uncorrect activation link.');
    }

    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
