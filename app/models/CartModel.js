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
        this.__id = data._id || createID();
        this._userid = data.userid || null;
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
     * Add a new item to the cart
     * @param {CartItemModel} item
     */
    addItem(item) {
        this._items.push(item);
        this.modified();
    }

    /**
     * Remove an item from the cart
     * @param {CartItemModel} item 
     * @returns {boolean} If the item exists
     */
    removeItem(item) {
        const itemIndex = this._items.findIndex(e => e._id === item._id);
        if (itemIndex > -1) {
            this._items = this._items.filter(e => e._id !== item._id);
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
        const itemsStored = this._items;
        for (const item of itemsStored) {
            if (item instanceof CartItemModel) {
                items.push(item.toCartItemSchema());
            } else {
                items.push(item);
            }
        }
        return {
            _id: this.__id,
            userid: this._userid,
            items: this._items,
            createdAt: this._createdAt,
            modifiedAt: this._modifiedAt
        };
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
     * @returns {CartItemModel[]}
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
     * @param {CartItemModel[]} newItems
     */
    set items(newItems) {
        if (this._items === newItems) {
            return;
        }
        this._items = newItems;
        this.modified();
    }
};