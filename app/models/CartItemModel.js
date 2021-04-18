const moment = require("moment");
const { CartItemSchema } = require("../db/schemas/cart");
const { createID } = require("../db");

module.exports = class CartItemModel {
    /**
     * @param {CartItemSchema} data Cart Item data
     */
    constructor(data) {
        this._id = data._id || createID();
        this.productid = data.productid || null;
        this.createdAt = data.createdAt || moment.utc().toISOString();
    }

    /**
     * @returns {CartItemSchema}
     */
    toCartItemSchema() {
        return {
            _id: this._id,
            productid: this.productid,
            createdAt: this.createdAt
        };
    }

    /**
     * @returns {string} Cart Item's ID
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
     * @returns {string}
     */
    get createdAt() {
        return this.createdAt;
    }
};