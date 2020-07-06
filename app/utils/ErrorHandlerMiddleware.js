function ErrorHandler(err, req, res, next) {
  const { status = 500, message = 'Error', code = 500 } = err;
  res.status(status).send({ error: { message, code } });

  return next();
}

class CustomError extends Error {
  constructor(status = 500, message, code = 500) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not found', code = 404) {
    super(404, message, code);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request', code = 400) {
    super(400, message, code);
  }
}

module.exports = {
  ErrorHandler,
  CustomError,
  NotFoundError,
  BadRequestError,
};
