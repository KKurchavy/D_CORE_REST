const uuid = require('uuid/v4');
const { Router } = require("express");
const { compareSync } = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const { tokenController } = require("../controllers/Token.controller");
const { userController } = require("../controllers/User.controller");

const { config } = require('../config');

class AuthRouter {
  constructor() {
    this.__router = Router();
    this.__configure();
  }

  getRoutes() {
    return this.__router;
  }

  async __issueTokenPair(userId) {
    const newRefreshToken = uuid();
    await tokenController.create({
      token: newRefreshToken,
      userId,
    });
  
    return {
      token: jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: 5400 }),
      refreshToken: newRefreshToken,
    };
  }

  __configure() {
    this.__router.post(
      "/signup",
      async (req, res) => {
        const { body } = req;
        await userController.create(body);
        res.send();
      });

    this.__router.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await userController.findOne(email);

      if (!user || !compareSync(password, user.password)) {
        const error = new Error();
        error.status = 403;
        throw error;
      }

      res.json(await this.__issueTokenPair(user.id));
    });

    this.__router.post("/refresh", async (req, res) => {
      const { refreshToken } = req.body;
      const dbToken = await tokenController.findOne(refreshToken);

      if (!dbToken) {
        return;
      }
      
      await tokenController.deleteOne(dbToken.userId);
      const tokenPair = await this.__issueTokenPair(dbToken.userId);
      res.json(tokenPair);
    });

    this.__router.get("/logout", async (req, res) => {
      const { id: userId } = req.user;
      await tokenController.deleteOne(userId);
      res.json({ success: true });
    });
  }
}

exports.authRoter = new AuthRouter;
