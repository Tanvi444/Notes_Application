const jsonWebToken = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token)
    return response.status(401).send({
      success: false,
      message: "Unauthorized request: Authorization token for this request is invalid.",
    });

  jsonWebToken.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, user) => {
    if (error)
      return response.status(401).send({
        success: false,
        message: "Unauthorized request: Authorization token for this request is invalid.",
      });
    request.user = user;

    next();
  });
};

module.exports = { authenticateToken };
