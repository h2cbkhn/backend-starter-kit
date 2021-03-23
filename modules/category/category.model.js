const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: String,
  ma: String,
  sort: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;

