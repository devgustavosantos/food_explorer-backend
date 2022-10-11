class AppError {
  message;
  statusError;
  constructor(message, statusError = 400) {
    this.message = message;
    this.statusError = statusError;
  }
}

module.exports = AppError;
