const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UserModel = require('../modules/user/user.model');

dotenv.config({path: '.env'});

const AuthMiddleware = {
  process(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization || null;
    if (token) {
      jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({success: false, messages: ['Failed to authenticate token.']});
        } else {
          UserModel.findOne({_id: decoded.userId}).lean().cache(240, `USER:${decoded.userId.toString()}`).exec((err, user) => {
            if (err || !user) {
              res.status(401).json({success: false, messages: ['Member doest exist.']});
              return;
            }
            req.auth = user;
            next();
          });
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        messages: ['No token provided.']
      });
    }
  }
};

module.exports = AuthMiddleware;
