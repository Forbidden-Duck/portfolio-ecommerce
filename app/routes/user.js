const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const { MongoService } = require("../loaders/mongodb");

const UserModel = require("../models/UserModel");

/**
 * @param {authRouter} app 
 * @param {passport} passport 
 * @param {MongoService} MongoDB 
 */
module.exports = (app, passport, MongoDB) => {
    app.use("/users", userRouter);

    userRouter.param("userid", async (req, res, next, userid) => {
        try {
            const user = await MongoDB.services.user.find({ _id: userid });
            if (user == null) {
                return res.sendStatus(404);
            }
            req.parsedUser = user;
            next();
        } catch (err) {
            next(err);
        }
    });

    userRouter.get("/:userid", (req, res, next) => {
        try {
            /**
             * @type {UserModel}
             */
            const user = req.parsedUser;
            res.status(200).send(user.toUserSchema());
        } catch (err) {
            next(err);
        }
    });

    userRouter.put("/:userid", async (req, res, next) => {
        try {
            /**
             * @type {UserModel}
             */
            const user = req.parsedUser;
            user.updateUser(req.body);
            const response = await MongoDB.services.user.update(user);
            res.status(200).send(response.toUserSchema());
        } catch (err) {
            next(err);
        }
    });
};