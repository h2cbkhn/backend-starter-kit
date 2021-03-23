const mongoose = require('mongoose');

const database = {

  /**
   * Check unique a field in a collection
   * @param model
   * @param key
   * @param value
   * @param callback
   */
  documentNotExist(model, key, value, callback) {
    const query = {};
    query[key] = value;
    model.count(query, (err, count) => {
      if (err) callback(false);
      else if (count > 0) callback(false);
      else if (count === 0) callback(true);
    });
  },

  /**
   * Create object id from string id
   * @param id
   * @returns {*}
   */
  makeObjectId(id) {
    try {
      return new mongoose.Types.ObjectId(id);
    } catch (err) {
      console.log(id);
      return new mongoose.Types.ObjectId('5b1e2de7da0cc926dfc02df5');
    }
  },

  /**
   * Create object id from string id
   * @param ids
   * @returns {*}
   */
  makeObjectIds(ids = []) {
    ids.forEach(id => { //eslint-disable-line
      id = new mongoose.Types.ObjectId(id);
    });
    return ids;
  }
};


module.exports = database;
