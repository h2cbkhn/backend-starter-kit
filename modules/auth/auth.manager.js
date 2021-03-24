const dotenv = require('dotenv');
const Manager = require('./../../core/manager');
const UserModel = require('../user/user.model');

dotenv.config({path: '.env'});

const ID = function () {
  return '-' + Math.random().toString(36).substr(2, 9); // eslint-disable-line
};

class AuthManager extends Manager {
  login({ username, password }, callback, callbackError) {
    UserModel.findOne({
      $and: [
        { password: { $ne: '', $exists: true } },
        { password: { $ne: null, $exists: true } },
      ],
      $or: [
        { username: username.toLowerCase().trim() }, { email: username.toLowerCase().trim() },
      ],
    }, (errors, user) => {
      if (errors) {
        return callbackError(errors, null);
      }
      if (!user) return callback(null, false, null, ['Tài khoản không tìm thấy']);
      // if (!user.active) return callback(null, false, null, ['Tài khoản chưa được kích hoạt']);
      user.comparePassword(password, user.password, (errors, isMatch) => {
        if (errors) return callbackError(errors, null);
        if (!isMatch) return callback(null, false, null, ['Mật khẩu không đúng']);
        const token = this.TokenService.makeAuthenticateToken(user);
        user.save(() => callback(null, true, {user, token}, ['Login thành công']));
      });
    });
  }
}

module.exports = new AuthManager();