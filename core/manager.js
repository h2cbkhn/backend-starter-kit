const CommonService = require('./service');

class Manager {
  constructor() {
    this.DatabaseService = CommonService.DatabaseService;
    this.AuthService = CommonService.AuthService;
    this.TokenService = CommonService.TokenService;
  }
  
  buildPaginationQuery(queryBuilder, limit = 20, page = 1) {
    return queryBuilder.limit(parseInt(limit, 10)).skip((parseInt(page, 10) - 1) * parseInt(limit, 10));
  }

  /**
   * Find a document by id
   * @param model
   * @param documentId
   * @param lean
   * @param callback
   */
   findDocumentById(model, documentId, lean, callback) {
    const queryBuilder = model.findOne({_id: this.DatabaseService.makeObjectId(documentId)});
    if (lean) {
      queryBuilder.lean();
    }
    queryBuilder.exec((errors, document) => {
      if (errors) {
        Manager.callbackFindDocumentByIdErrors(model, documentId, errors, callback);
        return;
      }
      callback(null, document);
    });
  }

  throwNewError(message) {
    return new Error(message);
  }

  /**
   * Make mongo object id
   * @param id
   * @return {*}
   */
   makeObjectId(id) {
    if (!id) return id;
    return this.DatabaseService.makeObjectId(id);
  }

  /**
   * Make mongo object ids
   * @param ids
   * @return {*}
   */
  makeObjectIds(ids) {
    return this.DatabaseService.makeObjectIds(ids);
  }
}
module.exports = Manager;