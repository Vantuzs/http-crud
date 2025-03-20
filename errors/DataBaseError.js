class DataBaseError extends Error {
    constructor(message) {
      super(message);
      this.message = 'Database Failed';
    }
  }
  
  module.exports = DataBaseError;