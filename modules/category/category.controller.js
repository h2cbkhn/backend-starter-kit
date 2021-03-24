const CategoryManager = require('./category.manager');

const CategoryController = {
  async search(req, res) {
    const categories = await CategoryManager.search(req.body);
    res.json({
      success: true,
      data: categories
    });
  },

  async create(req, res) {
    const category = await CategoryManager.create(req.auth, req.body);
    if (category && category._id) {
      res.json({ success: true, data: category, message: [] });
    } else {
      res.json({ success: false, message: ["Không thành công"] });
    }
  },

  async update(req, res) {
    const category = await CategoryManager.update(req.params.id, req.body);
    if (category && category._id) {
      res.json({ success: true, data: category, message: [] });
    } else {
      res.json({ success: false, message: ["Không thành công"] });
    }
  },

  async delete(req, res) {
    const status = await CategoryManager.delete(req.params.id);
    res.json({
      success: true,
      data: status
    });
  },
}

module.exports = CategoryController;