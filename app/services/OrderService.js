const OrderModel = require("../models/OrderModel");
const OrderItemModel = require("../models/OrderItemModel");
const OrderSchema = require("../db/schemas/orders");
const { OrderItemSchema } = require("../db/schemas/orders");
const createError = require("http-errors");
const Mongo = require("../db");

module.exports = class OrderService {
    /**
     * @param {Mongo} MongoDB 
     */
    constructor(MongoDB) {
        this.MongoDB = MongoDB;
    }

    /**
     * Create a new order
     * @param {OrderModel} model 
     * @returns {OrderModel}
     */
    async create(model) {
        // Create the order
        const orderToSchema = model.toOrderSchema();
        try {
            await this.MongoDB.insert("orders", model._id, orderToSchema);
        } catch (err) {
            throw createError(503, err.message);
        }

        // Check order exists
        const order = await this.find({ _id: model._id });
        if (user == null) {
            throw createError(503, "Could not create order");
        }
        return order;
    }

    /**
     * Update a order's information
     * @param {OrderModel} model
     * @returns {OrderModel}
     */
    async update(model) {
        // Check if order exists
        const order = await this.find({ _id: model._id });
        if (order == null) {
            throw createError(404, "Order not found");
        }
        model.modified();

        // Update order
        const orderToSchema = model.toOrderSchema();
        try {
            await this.MongoDB.update("orders", { _id: model._id }, { $set: orderToSchema });
        } catch (err) {
            throw createError(503, err.message);
        }
        return model;
    }

    /**
     * Find an order from the database
     * @param {OrderSchema} data 
     * @returns {OrderModel}
     */
    async find(data) {
        try {
            const order = (await this.MongoDB.find("orders", data, { limit: 1 }))[0];
            if (order == undefined) {
                return null;
            }
            return this.orderItemsToModel(new OrderModel(order));
        } catch (err) {
            throw createError(404, "Order not found");
        }
    }

    /**
     * Find an order item from the database
     * @param {string} orderID 
     * @param {OrderItemSchema} data 
     * @returns {OrderItemModel | null}
     */
    async findItem(orderID, data) {
        // Find and check order
        const order = await this.find({ _id: orderID });
        if (order == null) {
            throw createError(404, "Order not found");
        }

        // Find the order item on that order
        const item = order.items.find(orderItem => {
            for (const [key, value] of Object.entries(data)) {
                if (orderItem[key] !== value) {
                    return false;
                }
            }
            return true;
        });
        return item ? new OrderItemModel(item) : null;
    }

    /**
     * List a users orders
     * @param {string} userId 
     * @return {OrderModel[]}
     */
    async listByUser(userId) {
        try {
            const orders = [];
            const ordersFromDB = await this.MongoDB.find("orders", { userid: userId });
            for (const order of ordersFromDB) {
                orders.push(this.orderItemsToModel(new OrderModel(order)));
            }
            return orders;
        } catch (err) {
            throw createError(503, err.message);
        }
    }

    /**
     * Convert items in a model to OrderItemModel
     * @param {OrderModel} model 
     * @returns {OrderModel}
     */
    orderItemsToModel(model) {
        const itemsModel = [];
        const items = model.items;
        for (const item of items) {
            itemsModel.push(new OrderItemModel(item));
        }
        model.items = items;
        return model;
    }
}