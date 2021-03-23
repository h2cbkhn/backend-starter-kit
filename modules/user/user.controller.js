const UserManager = require('./user.manager');

const UserController = {
  async search(req, res) {
    const users = await UserManager.search(req.body);
    res.json({
      success: true,
      data: users
    });
  },

  async create(req, res) {
    const user = await UserManager.create(req.body);
    res.json({
      success: true,
      data: user
    });
  },

  async update(req, res) {
    const user = await UserManager.update(req.param.id, req.body);
    res.json({
      success: true,
      data: user
    });
  },

  async delete(req, res) {
    const status = await UserManager.delete(req.param.id);
    res.json({
      success: true,
      data: status
    });
  },
}

module.exports = UserController;