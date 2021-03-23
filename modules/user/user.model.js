const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  fullName: {
    type: String,
    default: null,
    index: true
  },
  email: {
    type: String,
    lowercase: true
  },
  password: String,
  username: {
    type: String,
    lowercase: true
  },
  avatar: String,
  phone: String,
  birthday: String,
  address: String,
  intro: String,
  status: {
    type: Boolean,
    default: false
  },
  gender: {
    type: Number,
    default: null,
  },
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) { // eslint-disable-line
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.email = user.email.toLowerCase();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * User saved then clear all cache from this user
 */

/**
 * Compare password
 * @param candidatePassword
 * @param passwordHash
 * @param cb
 */
userSchema.methods.comparePassword = (candidatePassword, passwordHash, cb) => {
  bcrypt.compare(candidatePassword, passwordHash, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
