const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET = process.env.JWT_SECRET;

module.exports.sign = async (user, callback) => {
  await jwt.sign(user, SECRET, (error, token) => {
    if (!error) {
      callback(token);
    }
    callback(false);
  });
};

module.exports.verify = (req, res, next) => {
  if (!req.headers.authorization) return res.status(503).json({msg: 'Unauthorized'})
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(403).json({
        msg: "Not Authorized"
      });
    }
    req.user = decodedToken;
    next();
  });
};
