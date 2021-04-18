const moment = require("moment");
const OrderItemModel = require("./OrderItemModel");
const OrderSchema = require("../db/schemas/orders");
const { OrderItemSchema } = require("../db/schemas/orders"); // Intellisense is stupid
const { createID } = require("../db");

/**
 * Changes OrderItemSchema to OrderItemModel
 * @typedef {object} Orders
 * @property {string} [_id]
 * @property {string} [userid]
 * @property {string} [status]
 * @property {number} [total]
 * @property {OrderItemModel[]} [items]
 * @property {string} [createdAt]
 * @property {string} [modifiedAt]
 */

module.exports = class OrderModel {
    /**
     * @param {Orders} data Order data
     */
    constructor(data) {
        this._id = data._id || createID();
        this.userid = data.userid || null;
        this.status = data.status || "PENDING";
        this.total = data.total || 0;
        this.items = data.items || [];
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
     * Add a new item to the order
     * @param {OrderItemModel} item
     */
    addItem(item) {
        this.items.push(item);
        this.modified();
    }

    /**
     * Remove an item from the order
     * @param {OrderItemModel} item 
     * @returns {boolean} If the item exists
     */
    removeItem(item) {
        const itemIndex = this.items.findIndex(e => e._id === item._id);
        if (itemIndex > -1) {
            this.items = this.items.filter(e => e._id !== item._id);
            this.modified();
            return true;
        } else {
            return false;
        }
    }

    /**
     * @returns {Orders}
     */
    toOrderSchema() {
        return {
            _id: this._id,
            userid: this.userid,
            status: this.status,
            total: this.total,
            items: this.items,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
        };
    }

    /**
     * Update order information
     * @param {object} data New order data
     * @param {string} [data.status]
     * @param {number} [data.total]
     * @param {OrderItemSchema[]} [data.items]
     */
    updateOrderInformation(data) {
        if (data.status) {
            this.status = data.status;
        }
        if (data.total) {
            this.total = data.total;
        }
        if (data.items) {
            this.items = data.items;
        }
    }

    /**
     * @returns {string} Order's ID
     */
    get _id() {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get userid() {
        return this.userid;
    }

    /**
     * @returns {string}
     */
    get status() {
        return this.status;
    }

    /**
     * @returns {number}
     */
    get total() {
        return this.total;
    }

    /**
     * @returns {OrderItemModel[]}
     */
    get items() {
        return this.items;
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
     * @param {string} newStatus
     */
    set status(newStatus) {
        if (this.status === newStatus) {
            return;
        }
        this.status = newStatus;
        this.modified();
    }

    /**
     * @param {number} newTotal
     */
    set total(newTotal) {
        if (this.email === newTotal) {
            return;
        }
        this.email = newTotal;
        this.modified();
    }

    /**
     * @param {OrderItemModel[]} newItems
     */
    set items(newItems) {
        if (this.items === newItems) {
            return;
        }
        this.items = newItems;
        this.modified();
    }
};