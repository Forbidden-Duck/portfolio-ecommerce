const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const { MongoService } = require("../loaders/mongodb");

const UserModel = require("../models/UserModel");

/**
 * @param {authRouter} app 
 * @param {passport} passport 
 * @param {MongoService} MongoDB 
 */
module.exports = (app, passport, MongoDB) => {
    app.use("/auth", authRouter);

    const validateUser = (req, res, next) => {
        const user = req.body;
        console.log(user)
        if (typeof user.username !== "string"
            || typeof user.password !== "string") {
            return res.sendStatus(400);
        }
        req.body = new UserModel(user);
        next();
    };

    authRouter.post("/register", validateUser, async (req, res, next) => {
        try {
            /**
             * @type {UserModel}
             */
            const user = req.body;
            const response = await MongoDB.services.auth.register(user);
            res.status(200).send(response.toUserSchema());
        } catch (err) {
            next(err);
        }
    });

    authRouter.post("/login", passport.authenticate("local"), async (req, res, next) => {
        try {
            res.status(200).send(req.user.toUserSchema());
        } catch (err) {
            next(err);
        }
    });
};