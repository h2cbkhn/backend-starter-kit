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
    const data = await UserManager.create(req.body);
    if (data && data._id) {
      res.json({ success: true, data: data });
    } else {
      res.json(user);
    }
    
  },

  async update(req, res) {
    const data = await UserManager.update(req.params.id, req.body);
    if (data && data._id) {
      res.json({ success: true, data: data });
    } else {
      res.json(user);
    }
  },

  async delete(req, res) {
    const status = await UserManager.delete(req.params.id);
    res.json({
      success: true,
      data: status
    });
  },
}

module.exports = UserController;