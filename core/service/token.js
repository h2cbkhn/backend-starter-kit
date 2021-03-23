const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

module.exports = {

  jwtTimeToLeave: '30 days',

  /**
   * Make a token
   * @param payload
   * @param expireAt
   * @returns {*}
   */
  makeToken(payload, expireAt) {
    return jwt.sign(payload, process.env.CLIENT_SECRET, {
      expiresIn: expireAt
    });
  },

  /**
   * Make authenticate token expire at next 60 days
   * @param user
   * @returns {*}
   */
  makeAuthenticateToken(user) {
    return jwt.sign({_id: user._id, role: user.role, name: user.name}, process.env.CLIENT_SECRET, {
      expiresIn: this.jwtTimeToLeave
    });
  },

  /**
   * Verify a token
   * @param token
   * @param callback
   */
  verifyToken(token, callback) {
    jwt.verify(token, process.env.CLIENT_SECRET, callback);
  },

  verifyTokenPromise(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.CLIENT_SECRET, (errors, decoded) => {
        if (errors) return reject(errors);
        return resolve(decoded);
      });
    });
  }
};
