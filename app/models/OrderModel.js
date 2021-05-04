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
        this.__id = data._id || createID();
        this._userid = data.userid || null;
        this._status = data.status || "PENDING";
        this._total = data.total || 0;
        this._items = data.items || [];
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
     * @returns {OrderSchema}
     */
    toOrderSchema() {
        const items = [];
        const itemsStored = this._items;
        for (const item of itemsStored) {
            if (item instanceof OrderItemModel) {
                items.push(item.toOrderItemSchema());
            } else {
                items.push(item);
            }
        }
        return {
            _id: this.__id,
            userid: this._userid,
            status: this._status,
            total: this._total,
            items: items,
            createdAt: this._createdAt,
            modifiedAt: this._modifiedAt
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
        return this.__id;
    }

    /**
     * @returns {string}
     */
    get userid() {
        return this._userid;
    }

    /**
     * @returns {string}
     */
    get status() {
        return this._status;
    }

    /**
     * @returns {number}
     */
    get total() {
        return this._total;
    }

    /**
     * @returns {OrderItemModel[]}
     */
    get items() {
        return this._items;
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
     * @param {string} newStatus
     */
    set status(newStatus) {
        if (this._status === newStatus) {
            return;
        }
        this._status = newStatus;
        this.modified();
    }

    /**
     * @param {number} newTotal
     */
    set total(newTotal) {
        if (this._email === newTotal) {
            return;
        }
        this._email = newTotal;
        this.modified();
    }

    /**
     * @param {OrderItemModel[]} newItems
     */
    set items(newItems) {
        if (this._items === newItems) {
            return;
        }
        this._items = newItems;
        this.modified();
    }
};