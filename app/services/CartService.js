const CartModel = require("../models/CartModel");
const CartItemModel = require("../models/CartItemModel");
const CartSchema = require("../db/schemas/carts");
const { CartItemSchema } = require("../db/schemas/carts");
const OrderModel = require("../models/OrderModel");
const OrderItemModel = require("../models/OrderItemModel");
const createError = require("http-errors");
const Mongo = require("../db");
const config = require("../../config");

module.exports = class CartService {
    /**
     * @param {Mongo} MongoDB 
     */
    constructor(MongoDB) {
        this.MongoDB = MongoDB;
    }

    /**
     * Create a new cart
     * @param {CartModel} model 
     * @returns {CartModel}
     */
    async create(model) {
        // Create the cart
        const cartToSchema = model.toCartSchema();
        try {
            await this.MongoDB.insert("carts", model._id, cartToSchema);
        } catch (err) {
            throw createError(503, err.message);
        }

        // Check cart exists
        const cart = await this.find({ _id: model._id });
        if (cart == null) {
            throw createError(503, "Could not create cart");
        }
        return cart;
    }

    /**
     * Update a cart's information
     * @param {CartModel} model 
     * @returns {CartModel}
     */
    async update(model) {
        // Check if cart exists
        const cart = await this.find({ _id: model._id });
        if (cart == null) {
            throw createError(404, "Cart not found");
        }
        model.modified();

        // Update cart
        const cartToSchema = model.toCartSchema();
        try {
            await this.MongoDB.update("carts", { _id: model._id }, { $set: cartToSchema });
        } catch (err) {
            throw createError(503, err.message);
        }
        return model;
    }

    /**
     * Find a cart from the database
     * @param {CartSchema} data 
     * @returns {CartModel}
     */
    async find(data) {
        try {
            const cart = await this.MongoDB.find("carts", data, { limit: 1 });
            if (cart == undefined) {
                return null;
            }
            return this.cartItemsToModel(new CartModel(cart));
        } catch (err) {
            throw createError(404, "Cart not found");
        }
    }

    /**
     * Find an cart item from the database
     * @param {string} cartID 
     * @param {CartItemSchema} data 
     * @returns {CartItemModel | null}
     */
    async findItem(cartID, data) {
        // Find and check cart
        const cart = await this.find({ _id: cartID });
        if (cart == null) {
            throw createError(404, "Cart not found");
        }

        // Find the cart item on that cart
        const item = order.items.find(cartItem => {
            for (const [key, value] of Object.entries(data)) {
                if (orderItem[key] !== value) {
                    return false;
                }
            }
            return true;
        });
        return item ? new CartItemModel(item) : null;
    }

    async checkout(cartID, paymentInfo) {
        try {
            const stripe = require("stripe")(config.STRIPE);

            // Find and check cart
            const cart = await this.find({ _id: cartID });
            if (cart == null) {
                throw createError(404, "Cart not found");
            }

            // Generate total price
            const total = cart.items.reduce((total, item) => {
                return total += item.price;
            }, 0);

            // Initialise the order model
            const order = new OrderModel({
                userid: cart.userid,
                total: total,
                items: this.cartItemsToOrderItems(cart)
            });

            // Make the charge
            const charge = await stripe.charges.create({
                amount: total,
                currency: "usd",
                source: paymentInfo.id,
                description: "Codecademy Charge"
            });

            order.status = "COMPLETED";
            return {
                order: order,
                charge: charge
            };
        } catch (err) {
            throw createError(503, err.message);
        }
    }

    /**
     * Convert items in a model to CartItemModel
     * @param {CartModel} model
     * @returns {CartModel} 
     */
    cartItemsToModel(model) {
        const itemsModel = [];
        const items = model.items;
        for (const item of items) {
            itemsModel.push(new CartItemModel(item));
        }
        model.items = items;
        return model;
    }

    /**
     * Convert items in a model to OrderItemModel
     * @param {CartModel} model 
     * @returns {OrderItemModel[]}
     */
    cartItemsToOrderItems(model) {
        const orderItems = [];
        const items = model.items;
        for (const item of items) {
            orderItems.push(new OrderItemModel(item.toCartItemSchema()));
        }
        return orderItems;
    }
}