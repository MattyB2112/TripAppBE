exports.mongoDBErrorHandler = (error, req, res, next) => {
  if (error.code === 11000) {
    res.status(400).json({ msg: "Bad Request: Username already in use" });
  }
};

exports.serverErrorHandler = (error, req, res, next) => {
  res.status(500).json({ msg: "Internal Server Error" });
};
