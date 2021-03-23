const Manager = require('../../core/manager');
const CategoryModel = require('./category.model');

class DanhMucManager extends Manager {

  async create(auth, data) {
    let category = {};
    category = this.buildData(data, category);
    category.createdAt = new Date();
    category.updatedAt = new Date();
    return CategoryModel.create(category);
  }

  async update(id, data) {
    let category = await CategoryModel.findOne({ _id: this.makeObjectId(id) });
    if (category) {
      category = this.buildData(data, category);
      category.updatedAt = new Date();
      category = category.save();
    }
    return category;
  }

  async delete(id) {
    return CategoryModel.find({ _id: this.makeObjectId(id) }).remove().exec();
  }

  async search(params) {
    let conditions = {};
    if (params) {
      conditions = this.filterData(params);
    }
    const queryBuilder = CategoryModel.find(conditions);
    return queryBuilder.sort({ _id: -1 }).exec();
  }

  async count(params) {
    let conditions = { };
    if (params) {
      conditions = this.filterData(params);
    }
    return CategoryModel.count(conditions);
  }

  filterData(params) {
    const conditions = {
    };
   
    return conditions;
  }

  buildData(data, danhmuc) {
    if (typeof data.name !== 'undefined') {
      danhmuc.name = data.name;
    }
    if (typeof data.ma !== 'undefined') {
      danhmuc.ma = data.ma;
    }
    if (typeof data.sort !== 'undefined') {
      danhmuc.sort = data.sort;
    }
    if (typeof data.nhomDanhMuc !== 'undefined') {
      danhmuc.nhomDanhMuc = data.nhomDanhMuc;
    }
    return danhmuc;
  }

}

module.exports = new DanhMucManager();
