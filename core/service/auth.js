const auth = {

  auth: null,

  /**
   * Get auth
   * @returns {*|null}
   */
  getAuth() {
    return this.auth;
  },

  /**
   * Set auth
   * @param auth
   * @returns {*|null}
   */
  setAuth(auth) {
    this.auth = auth;
    return this.auth;
  }
};

module.exports = auth;

