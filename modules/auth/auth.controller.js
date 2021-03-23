const AuthManager = require('./auth.manager');
const AuthValidator = require('./auth.validator');

const AuthController = {
  async login(req, res, next) {
    req.check(AuthValidator.loginValidator());
    const result = await req.getValidationResult();
    const messages = [];
    if (result.array().length > 0) {
      result.array().forEach(error => {
        messages.push(error.msg);
      });
    }
    AuthManager.login(req.body, (errors, success, data, messages) => {
      if (success) {
        return res.json({success: true, data, messages}); 
      }
      res.json({success: false, data, messages}); // Login failed with wrong conditions
    }, (errors) => {
      console.log(errors);
      next(errors);
    });
  },
};

module.exports = AuthController;