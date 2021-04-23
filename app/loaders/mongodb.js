const Mongo = require("../db");
const DB = require("../../config");

const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const ProductService = require("../services/ProductService");
const OrderService = require("../services/OrderService");
const CartService = require("../services/CartService");

module.exports = async () => {
    /**
     * @type {Mongo}
     */
    const MongoDB = await (new Mongo(DB))();
    const user = new UserService(MongoDB); // Auth service requires the user service
    return {
        client: MongoDB,
        services: {
            auth: new AuthService(MongoDB, user),
            user: user,
            product: new ProductService(MongoDB),
            order: new OrderService(MongoDB),
            cart: new CartService(MongoDB)
        }
    };
};

/**
 * @typedef {object} MongoService
 * @property {Mongo} client
 * @property {object} services
 * @property {AuthService} services.auth
 */

/**
 * @type {MongoService}
 */
module.exports.MongoService = {}; // Provides the MongoService type to other files