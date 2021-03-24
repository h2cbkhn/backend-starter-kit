const Manager = require('../../core/manager');
const ROLE = require('../../core/constants/role');
const UserModel = require('./user.model');

class UserManager extends Manager {
  async search(limit, page, params) {
    const conditions = this.buildFilter(params);
    let queryBuilder = UserModel.find(conditions);
    queryBuilder = this.buildPaginationQuery(queryBuilder, limit, page);
    return queryBuilder.exec();
  }

  async create(data) {
    const checkUser = await UserModel.findOne({ username: data.username });
    if (checkUser) {
      return { status: false, data: null ,message: ['username đã tồn tại'] };
    }
    let user = {};
    user = this.buildData(data, user);
    user.role = ROLE.SUPER_ADMIN;
    user.createdAt = new Date();
    user.username = data.username;
    user.updatedAt = new Date();
    return UserModel.create(user);
  }

  async update(id, data) {
    let user = await UserModel.findOne({ _id: this.makeObjectId(id) });
    if (user) {
      user = this.buildData(data, user);
      user.updatedAt = new Date();
      user.role = ROLE.BAC_SY;
      user = user.save();
    }
    return user;
  }

  async delete(id) {
    return UserModel.find({ _id: this.makeObjectId(id) }).remove().exec();
  }

  buildData(data, user) {
    if (typeof data.name !== 'undefined') {
      user.name = data.name;
    }
    if (typeof data.email !== 'undefined') {
      user.email = data.email;
    }
    if (typeof data.password !== 'undefined') {
      user.password = data.password;
    }
    if (typeof data.avatar !== 'undefined') {
      user.avatar = data.avatar;
    }
    if (typeof data.phone !== 'undefined') {
      user.phone = data.phone;
    }
    if (typeof data.birthday !== 'undefined') {
      user.birthday = data.birthday;
    }
    if (typeof data.address !== 'undefined') {
      user.address = data.address;
    }
    if (typeof data.intro !== 'undefined') {
      user.intro = data.intro;
    }
    if (typeof data.status !== 'undefined') {
      user.status = data.status;
    }
    if (typeof data.gender !== 'undefined') {
      user.gender = data.gender;
    }
    return user;
  }

  buildFilter(params) {
    const conditions = {};
    return conditions;
  }
}

module.exports = new UserManager();