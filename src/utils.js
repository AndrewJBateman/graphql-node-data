const jwt = require("jsonwebtoken");
const APP_SECRET = "app-secret1234"; // sign JWT with APP_SECRET

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

// check user is authenticated then if so return user ID
function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    } else if (authToken) {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }

    throw new Error("Not authenticated");
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
};
