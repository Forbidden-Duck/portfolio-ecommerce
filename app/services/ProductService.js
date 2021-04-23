const ProductModel = require("../models/ProductModel");
const ProductSchema = require("../db/schemas/products");
const createError = require("http-errors");
const Mongo = require("../db");

module.exports = class ProductService {
    /**
     * @param {Mongo} MongoDB 
     */
    constructor(MongoDB) {
        this.MongoDB = MongoDB;
    }

    /**
     * Create a new product
     * @param {ProductModel} model 
     * @returns {ProductModel}
     */
    async create(model) {
        // Create the product
        const productToSchema = model.toProductSchema();
        try {
            await this.MongoDB.insert("products", model._id, productToSchema);
        } catch (err) {
            throw createError(503, err.message);
        }

        // Check if product exists
        const product = await this.find({ _id: model._id });
        if (product == null) {
            throw createError(503, "Could not create product");
        }
        return product;
    }

    /**
     * Find a product from the database
     * @param {ProductSchema} data
     * @returns {ProductModel | null}
     */
    async find(data) {
        try {
            const product = (await this.MongoDB.find("products", data, { limit: 1 }))[0];
            if (product == undefined) {
                return null;
            }
            return new ProductModel(product);
        } catch (err) {
            throw createError(404, "Product not found");
        }
    }

    /**
     * Find many products from the database
     * @param {ProductSchema} data 
     * @returns {ProductModel[]}
     */
    async findMany(data) {
        try {
            const products = [];
            const productsFromDB = (await this.MongoDB.find("products", data));
            for (const product of productsFromDB) {
                products.push(new ProductModel(product));
            }
            return products;
        } catch (err) {
            throw createError(503, err.message);
        }
    }
}