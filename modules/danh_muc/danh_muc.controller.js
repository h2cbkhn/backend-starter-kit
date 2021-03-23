const DanhMucController = {
  async search(req, res) {
    res.json({
      success: true,
      data: [{id: new Date().toISOString(), name: 'MinhPV', 'email': 'minhpv.bkhn@gmail.com'}]
    });
  },
}

module.exports = DanhMucController;