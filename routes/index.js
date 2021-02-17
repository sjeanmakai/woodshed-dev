const userRoutes = require("./user_routes");
const sessionRoutes = require("./session_routes");

// add all routes here
module.exports = function (app, db) {
  userRoutes(app, db);
  sessionRoutes(app, db);
};
