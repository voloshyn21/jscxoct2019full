module.exports = class ErrorHanlder extends Error {
  constructor(message, status, customCode) {
    super(message);
    // this.message = message;
    this.status = status;
    this.customCode = customCode;

    Error.captureStackTrace(this, this.constructor);
  }
};
