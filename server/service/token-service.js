const jwt = require('jsonwebtoken');

const TokenModel = require('../models/Token');

const accessKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFRESH_TOKEN_KEY;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessKey, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });

    return token.save();
  }

  async deleteToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    const userData = await TokenModel.findOne({ refreshToken });
    return userData;
  }
}

module.exports = new TokenService();
