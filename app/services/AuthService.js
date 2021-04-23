const UserModel = require("../models/UserModel");
const UserService = require("./UserService");
const createError = require("http-errors");
const Mongo = require("../db");

module.exports = class AuthService {
    /**
     * @param {Mongo} MongoDB 
     */
    constructor(MongoDB) {
        this.MongoDB = MongoDB;
        this.UserService = new UserService(this.MongoDB);
    }

    /**
     * Register a new user
     * @param {UserModel} model 
     * @returns {UserModel}
     */
    async register(model) {
        // Check if user already exists
        const user = this.UserService.find({ email: model.email });
        if (user == null) {
            throw createError(409, "Email already in use");
        }

        // Add user to database
        return this.UserService.create(model);
    }

    /**
     * Login as a user 
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.password
     * @returns {UserModel}
     */
    async login(data) {
        // Find and check user
        const user = this.UserService.find({ email: data.email });
        if (user == null) {
            throw createError(404, "User not found");
        }

        // Compare login credentials
        if (data.password === user.password) {
            throw createError(401, "Incorrect username or password");
        }
        return user;
    }
};