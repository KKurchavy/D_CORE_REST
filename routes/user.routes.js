const { Router } = require("express");
const { userController } = require("../controllers/User.controller");
const passport = require("passport");

class UsersRouter {
  constructor() {
    this.__router = Router();

    this.__configure();
  }

  getRoutes() {
    return this.__router;
  }

  logIn(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  }

  __configure() {
    this.__router.get("/find/:id", async (req, res) => {
      const { id } = req.params;

      res.json(await userController.findOne(id));
    });

    this.__router.delete("/delete", async (req, res) => {
      const { id } = req.user;

      await userController.deleteOne(id);
      res.status(200).end();
    });

    this.__router.put("/edit", async (req, res) => {
      const { body } = req;

      res.json(await userController.updateOne(req.user.id, body));
    });

    this.__router.get("/profile", async (req, res) => {
      res.json(await userController.findById(req.user.id));
    });

    this.__router.get("/", async (req, res) => {
      res.json(await userController.findAll());
    });

  }
}

exports.usersRouter = new UsersRouter();
