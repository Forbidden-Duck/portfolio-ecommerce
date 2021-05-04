const express = require("express");
const cartRouter = express.Router();
const passport = require("passport");
const { MongoService } = require("../loaders/mongodb");

const CartModel = require("../models/CartModel");
const CartItemModel = require("../models/CartItemModel");

/**
 * @param {cartRouter} app 
 * @param {passport} passport 
 * @param {MongoService} MongoDB 
 */
module.exports = (app, passport, MongoDB) => {
    app.use("/carts", cartRouter);

    const validateCart = (req, res, next) => {
        const cart = req.body;
        if (typeof cart.userid !== "string") {
            return res.sendStatus(400);
        }
        req.parsedCart = new CartModel(cart);
        next();
    };

    const validateCartItem = (req, res, next) => {
        const cartItem = req.body;
        if (typeof cartItem.productid !== "string"
            || typeof cartItem.quantity !== "number"
            || typeof cartItem.price !== "number") {
            return res.sendStatus(400);
        }
        req.parsedCartItem = new CartItemModel(cartItem);
        next();
    };

    cartRouter.param("cartid", async (req, res, next, cartid) => {
        try {
            const cart = await MongoDB.services.cart.find({ _id: cartid });
            if (cart == null) {
                return res.status(404).send("Cart not found");
            }
            req.parsedCart = cart;
            next();
        } catch (err) {
            next(err);
        }
    });

    cartRouter.param("cartitemid", async (req, res, next, cartitemid) => {
        try {
            const cartid = req.parsedCart ? req.parsedCart._id : req.body.cartid;
            const cartItem = await MongoDB.services.cart.findItem(cartid, { _id: cartitemid });
            if (cartItem == null) {
                return res.status(404).send("Cart item not found");
            }
            req.parsedCartItem = cartItem;
            next();
        } catch (err) {
            next(err);
        }
    });

    cartRouter.post("/", validateCart, async (req, res, next) => {
        try {
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            const response = await MongoDB.services.cart.create(cart);
            res.status(201).send(response.toCartSchema());
        } catch (err) {
            next(err);
        }
    });

    cartRouter.get("/:cartid", async (req, res, next) => {
        try {
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            res.status(200).send(cart.toCartSchema());
        } catch (err) {
            next(err);
        }
    });

    cartRouter.post("/:cartid/items", validateCartItem, async (req, res, next) => {
        try {
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            /**
             * @type {CartItemModel}
             */
            const cartItem = req.parsedCartItem
            cart.addItem(cartItem);

            const response = await MongoDB.services.cart.update(cart);
            res.status(201).send(response.toCartSchema());
        } catch (err) {
            next(err);
        }
    });

    cartRouter.put("/:cartid/items/:cartitemid", async (req, res, next) => {
        try {
            const data = req.body;
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            /**
             * @type {CartItemModel}
             */
            const cartItem = req.parsedCartItem;

            // Find the index of the item
            // Update the model of the cart item
            const cartItemIndex = cart.items.findIndex(item => item._id === cartItem._id);
            cartItem.updateCartItem(data);

            // Check if item index was found
            // Update the cart item
            if (cartItemIndex == -1) {
                return res.status(404).send("Cart item not found");
            }
            cart.items[cartItemIndex] = cartItem;

            // Update the database with the new cart
            await MongoDB.services.cart.update(cart);
            res.status(200).send(cart.toCartSchema());
        } catch (err) {
            next(err);
        }
    });

    cartRouter.delete("/:cartid/items/:cartitemid", async (req, res, next) => {
        try {
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            /**
             * @type {CartItemModel}
             */
            const cartItem = req.parsedCartItem;

            const success = cart.removeItem(cartItem);
            if (!success) {
                return res.sendStatus(500);
            }

            await MongoDB.services.cart.update(cart);
            res.status(200).send(cart.toCartSchema());
        } catch (err) {
            next(err);
        }
    });

    cartRouter.post("/:cartid/checkout", async (req, res, next) => {
        try {
            /**
             * @type {CartModel}
             */
            const cart = req.parsedCart;
            const { paymentinfo } = req.body;

            const { order, charge } = await MongoDB.services.cart.checkout(cart._id, paymentinfo);
            const response = await MongoDB.services.order.create(order);
            res.status(201).send({ order: response.toOrderSchema(), charge });
        } catch (err) {
            next(err);
        }
    });
};