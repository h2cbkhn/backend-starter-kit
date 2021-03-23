const Manager = require('../../core/manager');
const UserModel = require('./user.model');

class UserManager extends Manager {
  async search(limit, page, params) {
    const conditions = this.buildFilter(params);
    let queryBuilder = UserModel.find(conditions);
    queryBuilder = this.buildPaginationQuery(queryBuilder, limit, page);
    return queryBuilder.exec();
  }

  async create(params) {
    const conditions = this.buildFilter(params);
    let queryBuilder = UserModel.find(conditions);
    queryBuilder = this.buildPaginationQuery(queryBuilder, limit, page);
    return queryBuilder.exec();
  }

  async update(id, params) {
    const conditions = this.buildFilter(params);
    let queryBuilder = UserModel.find(conditions);
    queryBuilder = this.buildPaginationQuery(queryBuilder, limit, page);
    return queryBuilder.exec();
  }

  async delete(id) {
    const conditions = this.buildFilter(params);
    let queryBuilder = UserModel.find(conditions);
    queryBuilder = this.buildPaginationQuery(queryBuilder, limit, page);
    return queryBuilder.exec();
  }

  buildFilter(params) {
    const conditions = {};
    return conditions;
  }
}

module.exports = new UserManager();