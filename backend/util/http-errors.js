class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createHttpError = (message, statusCode) => {
  return new HttpError(message, statusCode);
};

module.exports = {
  HttpError,
  createHttpError,
};
