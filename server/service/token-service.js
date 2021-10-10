const jwt = require('jsonwebtoken');

const TokenModel = require('../models/Token');

const accessKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFRESH_TOKEN_KEY;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await TokenModel.create({user: userId, refreshToken})

    return token.save();
  }
}

module.exports = new TokenService();
