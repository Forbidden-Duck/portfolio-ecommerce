const moment = require("moment");
const { OrderItemSchema } = require("../db/schemas/orders");
const { createID } = require("../db");

module.exports = class OrderItemModel {
    /**
     * @param {OrderItemSchema} data Order Item data
     */
    constructor(data) {
        this._id = data._id || createID();
        this.productid = data.productid || null;
        this.quantity = data.quantity || 0;
        this.price = data.price || 0;
        this.createdAt = data.createdAt || moment.utc().toISOString();
        this.modifiedAt = data.modifiedAt || "0";
    }

    /**
     * Update the modified at to the current time
     * @returns {string} UTC ISO String
     */
    modified() {
        this.modifiedAt = moment.utc().toISOString();
    }

    /**
     * @returns {OrderItemSchema}
     */
    toOrderItemSchema() {
        return {
            _id: this._id,
            productid: this.productid,
            quantity: this.quantity,
            price: this.price,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
        };
    }

    /**
     * Update order item information
     * @param {object} data New order data
     * @param {number} [data.quantity]
     * @param {number} [data.price]
     */
    updateOrderItem(data) {
        if (data.quantity) {
            this.quantity = data.quantity;
        }
        if (data.price) {
            this.price = data.price;
        }
    }

    /**
     * @returns {string} Order Item's ID
     */
    get _id() {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get productid() {
        return this.productid;
    }

    /**
     * @returns {number}
     */
    get quantity() {
        return this.quantity;
    }

    /**
     * @returns {number}
     */
    get price() {
        return this.price;
    }

    /**
     * @returns {string}
     */
    get createdAt() {
        return this.createdAt;
    }

    /**
     * @returns {string}
     */
    get modifiedAt() {
        return this.modifiedAt;
    }

    /**
     * @param {number} newQuantity
     */
    set quantity(newQuantity) {
        if (this.quantity === newQuantity) {
            return;
        }
        this.quantity = newQuantity;
        this.modified();
    }

    /**
     * @param {number} newPrice
     */
    set price(newPrice) {
        if (this.price === newPrice) {
            return;
        }
        this.price = newPrice;
        this.modified();
    }
};