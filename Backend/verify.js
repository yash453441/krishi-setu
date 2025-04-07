const jwt = require("jsonwebtoken");

const verifyToken = (req, resp, next) => {
  const token = req.body.token;
  
  if (!token) {
    return resp.status(404).json({ 
      status: "false", 
      message: "Token not found" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTTOKENKEY);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    return resp.status(403).json({ 
      status: "false", 
      message: "Invalid Token" 
    });
  }
};

module.exports = verifyToken;
