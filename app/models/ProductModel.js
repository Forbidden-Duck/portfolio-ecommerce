const moment = require("moment");
const ProductSchema = require("../db/schemas/products");
const { createID } = require("../db");

module.exports = class ProductModel {
    /**
     * @param {ProductSchema} data Product data
     */
    constructor(data) {
        this.__id = data._id || createID();
        this._name = data.name || "";
        this._description = data.description || "";
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
     * @returns {ProductSchema}
     */
    toProductSchema() {
        return {
            _id: this.__id,
            name: this._name,
            description: this._description,
            price: this._price,
            createdAt: this._createdAt,
            modifiedAt: this._modifiedAt
        };
    }

    /**
     * Update product information
     * @param {object} data New product data
     * @param {string} [data.name]
     * @param {string} [data.description]
     * @param {number} [data.price]
     */
    updateProduct(data) {
        if (data.name) {
            this._name = data.name;
        }
        if (data.description) {
            this._description = data.description;
        }
        if (data.price) {
            this._price = data.price;
        }
    }

    /**
     * @returns {string} Product's ID
     */
    get _id() {
        return this.__id;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {string}
     */
    get description() {
        return this._description;
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
     * @param {string} newName
     */
    set name(newName) {
        if (this._name === newName) {
            return;
        }
        this._name = newName;
        this.modified();
    }

    /**
     * @param {string} newDescription
     */
    set description(newDescription) {
        if (this._description === newDescription) {
            return;
        }
        this._description = newDescription;
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