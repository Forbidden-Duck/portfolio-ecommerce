const UserModel = require("../models/UserModel");
const UserSchema = require("../db/schemas/users");
const createError = require("http-errors");
const Mongo = require("../db");

module.exports = class UserService {
    /**
     * @param {Mongo} MongoDB 
     */
    constructor(MongoDB) {
        this.MongoDB = MongoDB;
    }

    /**
     * Create a new user
     * @param {UserModel} model 
     * @returns {UserModel}
     */
    async create(model) {
        // Create the user
        const userToSchema = model.toUserSchema();
        try {
            await this.MongoDB.insert("users", model._id, userToSchema);
        } catch (err) {
            throw createError(503, err.message);
        }

        // Check user exists
        const user = await this.find({ _id: model._id });
        if (user == null) {
            throw createError(503, "Could not create user");
        }
        return user;
    }

    /**
     * Update a user's information
     * @param {UserModel} model
     * @returns {UserModel}
     */
    async update(model) {
        // Check if user exists
        const user = await this.find({ _id: model._id });
        if (user == null) {
            throw createError(404, "User not found");
        }
        model.modified();

        // Update user
        const userToSchema = model.toUserSchema();
        try {
            await this.MongoDB.update("users", { _id: model._id }, { $set: userToSchema });
        } catch (err) {
            throw createError(503, err.message);
        }
        return model;
    }

    /**
     * Find a user from the database
     * @param {UserSchema} data
     * @returns {UserModel | null}
     */
    async find(data) {
        try {
            const user = (await this.MongoDB.find("users", data, { limit: 1 }))[0];
            if (user == undefined) {
                return null;
            }
            return new UserModel(user);
        } catch (err) {
            throw createError(404, "User not found");
        }
    }
}