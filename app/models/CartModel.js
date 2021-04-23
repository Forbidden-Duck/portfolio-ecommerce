const moment = require("moment");
const CartItemModel = require("./CartItemModel");
const CartSchema = require("../db/schemas/carts");
const { CartItemSchema } = require("../db/schemas/carts"); // Intellisense is stupid
const { createID } = require("../db");

/**
 * Changes CartItemSchema to CartItemModel
 * @typedef {object} Cart
 * @property {string} [_id]
 * @property {string} [userid]
 * @property {CartItemModel[]} [items]
 * @property {string} [createdAt]
 * @property {string} [modifiedAt]
 */

module.exports = class CartModel {
    /**
     * @param {Cart} data Cart data
     */
    constructor(data) {
        this._id = data._id || createID();
        this.userid = data.userid || null;
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
     * Add a new item to the cart
     * @param {CartItemModel} item
     */
    addItem(item) {
        this.items.push(item);
        this.modified();
    }

    /**
     * Remove an item from the cart
     * @param {CartItemModel} item 
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
     * @returns {CartSchema}
     */
    toCartSchema() {
        const items = [];
        const itemsStored = this.items;
        for (const item of itemsStored) {
            if (item instanceof CartItemModel) {
                items.push(item.toCartItemSchema());
            } else {
                items.push(item);
            }
        }
        return {
            _id: this._id,
            userid: this.userid,
            items: this.items,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
        };
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
     * @returns {CartItemModel[]}
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
     * @param {CartItemModel[]} newItems
     */
    set items(newItems) {
        if (this.items === newItems) {
            return;
        }
        this.items = newItems;
        this.modified();
    }
};