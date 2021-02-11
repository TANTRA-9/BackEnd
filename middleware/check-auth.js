const httpError = require("../models/http-error");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.method == "OPTIONS"){
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new httpError("Authentication failed!", 402);
      throw error;
    }
    const decodedToken = jwt.verify(token, "first_secure_token");
    req.userData = { userID: decodedToken.userID };
    next();
  } catch (err) {
    const error = new httpError("Authentication failed!", 402);
    return next(error);
  }
};