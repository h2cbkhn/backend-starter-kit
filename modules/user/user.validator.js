const UserValidator = {
  userCreateValidator() {
    return {
      username: {
        in: 'body',
        notEmpty: {
          options: true,
          errorMessage: 'username bắt buộc',
        },
        isLength: {
          options: [{ min: 3, max: 50 }],
          errorMessage: 'username dài từ 3 đến 50 kí tự',
        },
      },
      password: {
        in: 'body',
        notEmpty: {
          options: true,
          errorMessage: 'Mật khẩu không được trống',
        },
        isLength: {
          options: [{ min: 6, max: 50 }],
          errorMessage: 'Mật khẩu dài từ 6 đến 50 kí tự',
        },
      }
    };
  },
};
module.exports = UserValidator;
