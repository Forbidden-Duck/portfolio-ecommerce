const Mongo = require("../db");
const DB = require("../../config");

const AuthService = require("../services/AuthService");

module.exports = async () => {
    /**
     * @type {Mongo}
     */
    const MongoDB = await (new Mongo(DB))();
    return {
        client: MongoDB,
        services: {
            auth: new AuthService(MongoDB)
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