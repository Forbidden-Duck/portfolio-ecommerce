const express = require("express");
const orderRouter = express.Router();
const passport = require("passport");
const { MongoService } = require("../loaders/mongodb");

const OrderModel = require("../models/OrderModel");

/**
 * @param {orderRouter} app 
 * @param {passport} passport 
 * @param {MongoService} MongoDB 
 */
module.exports = (app, passport, MongoDB) => {
    app.use("/orders", orderRouter);

    orderRouter.param("orderid", async (req, res, next, orderid) => {
        try {
            const order = await MongoDB.services.order.find({ _id: orderid });
            if (order == null) {
                return res.sendStatus(404);
            }
            req.parsedOrder = order;
            next();
        } catch (err) {
            next(err);
        }
    });

    orderRouter.get("/", async (req, res, next) => {
        try {
            const { userid } = req.body;
            const orders = await MongoDB.services.order.listByUser(userid);
            res.status(200).send(orders.map(order => order.toOrderSchema()));
        } catch (err) {
            next(err);
        }
    });

    orderRouter.get("/:orderid", (req, res, next) => {
        try {
            /**
             * @type {OrderModel}
             */
            const order = req.parsedOrder;
            res.status(200).send(order.toOrderSchema());
        } catch (err) {
            next(err);
        }
    });
};