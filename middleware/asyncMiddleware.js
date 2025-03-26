function asyncMiddleware(fn) {
  return function (req, res, next) {
    // Catch any errors from async API handler
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { asyncMiddleware };
