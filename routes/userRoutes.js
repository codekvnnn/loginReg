const UserController = require("../controllers/userController");

module.exports = app => {
    app.post("/api/register", UserController.register);
    app.get("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
}