const bcrypt = require('bcrypt-nodejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jumblator = require("mongoose-jumblator").fieldEncryptionPlugin;

dotenv.config({path: '.env'});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    lowercase: true,
    encrypt: true,
    searchable: true, //searchable field
  },
  password: String,
  username: {
    type: String,
    lowercase: true,
    encrypt: true,
    searchable: true, //searchable field
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
// process.env.CLIENT_SECRET


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

userSchema.plugin(jumblator, { secret: process.env.CLIENT_SECRET /* other options */ });

const User = mongoose.model('User', userSchema);

module.exports = User;
