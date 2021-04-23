const moment = require("moment");
const ProductSchema = require("../db/schemas/products");
const { createID } = require("../db");

module.exports = class ProductModel {
    /**
     * @param {ProductSchema} data Product data
     */
    constructor(data) {
        this._id = data._id || createID();
        this.name = data.name || "";
        this.description = data.description || "";
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
     * @returns {ProductSchema}
     */
    toProductSchema() {
        return {
            _id: this._id,
            name: this.name,
            description: this.description,
            price: this.price,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
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
            this.name = data.name;
        }
        if (data.description) {
            this.description = data.description;
        }
        if (data.price) {
            this.price = data.price;
        }
    }

    /**
     * @returns {string} Product's ID
     */
    get _id() {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this.name;
    }

    /**
     * @returns {string}
     */
    get description() {
        return this.description;
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
     * @param {string} newName
     */
    set name(newName) {
        if (this.name === newName) {
            return;
        }
        this.name = newName;
        this.modified();
    }

    /**
     * @param {string} newDescription
     */
    set description(newDescription) {
        if (this.description === newDescription) {
            return;
        }
        this.description = newDescription;
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