const express = require("express");
const productRouter = express.Router();
const passport = require("passport");
const { MongoService } = require("../loaders/mongodb");

const ProductModel = require("../models/ProductModel");

/**
 * @param {authRouter} app 
 * @param {passport} passport 
 * @param {MongoService} MongoDB 
 */
module.exports = (app, passport, MongoDB) => {
    app.use("/products", productRouter);

    productRouter.param("productid", async (req, res, next, productid) => {
        try {
            const product = await MongoDB.services.product.find({ _id: productid });
            if (product == null) {
                return res.sendStatus(404);
            }
            req.parsedProduct = product;
            next();
        } catch (err) {
            next(err);
        }
    });

    productRouter.get("/", async (req, res, next) => {
        try {
            const data = req.body;
            const products = await MongoDB.services.product.findMany(data);
            res.status(200).send(products.map(product => product.toProductSchema()));
        } catch (err) {
            next(err);
        }
    });

    productRouter.get("/:productid", (req, res, next) => {
        try {
            /**
             * @type {ProductModel}
             */
            const product = req.parsedProduct;
            res.status(200).send(product.toProductSchema());
        } catch (err) {
            next(err);
        }
    });
};