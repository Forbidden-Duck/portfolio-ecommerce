const moment = require("moment");
const { CartItemSchema } = require("../db/schemas/carts");
const { createID } = require("../db");

module.exports = class CartItemModel {
    /**
     * @param {CartItemSchema} data Cart Item data
     */
    constructor(data) {
        this.__id = data._id || createID();
        this._productid = data.productid || null;
        this._quantity = data.quantity || 0;
        this._price = data.price || 0;
        this._createdAt = data.createdAt || moment.utc().toISOString();
        this._modifiedAt = data.modifiedAt || "0";
    }

    /**
     * Update the modified at to the current time
     * @returns {string} UTC ISO String
     */
    modified() {
        this._modifiedAt = moment.utc().toISOString();
    }

    /**
     * @returns {CartItemSchema}
     */
    toCartItemSchema() {
        return {
            _id: this.__id,
            productid: this._productid,
            createdAt: this._createdAt
        };
    }

    /**
     * Update cart item information
     * @param {object} data New cart data
     * @param {number} [data.quantity]
     * @param {number} [data.price]
     */
    updateCartItem(data) {
        if (data.quantity) {
            this._quantity = data.quantity;
        }
        if (data.price) {
            this._price = data.price;
        }
    }

    /**
     * @returns {string} Cart Item's ID
     */
    get _id() {
        return this.__id;
    }

    /**
     * @returns {string}
     */
    get productid() {
        return this._productid;
    }

    /**
     * @returns {number}
     */
    get quantity() {
        return this._quantity;
    }

    /**
     * @returns {number}
     */
    get price() {
        return this._price;
    }

    /**
     * @returns {string}
     */
    get createdAt() {
        return this._createdAt;
    }

    /**
     * @returns {string}
     */
    get modifiedAt() {
        return this._modifiedAt;
    }

    /**
     * @param {number} newQuantity
     */
    set quantity(newQuantity) {
        if (this._quantity === newQuantity) {
            return;
        }
        this._quantity = newQuantity;
        this.modified();
    }

    /**
     * @param {number} newPrice
     */
    set price(newPrice) {
        if (this._price === newPrice) {
            return;
        }
        this._price = newPrice;
        this.modified();
    }
};