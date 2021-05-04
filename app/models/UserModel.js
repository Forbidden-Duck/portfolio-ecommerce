const moment = require("moment");
const UserSchema = require("../db/schemas/users");
const { createID } = require("../db");

module.exports = class UserModel {
    /**
     * @param {UserSchema} data User data
     */
    constructor(data) {
        this.__id = data._id || createID();
        this._email = data.email || data.username || "";
        this._password = data.password || "";
        this._firstname = data.firstname || "";
        this._lastname = data.lastname || "";
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
     * @returns {string}
     */
    fullname() {
        return `${this._firstname} ${this._lastname}`;
    }

    /**
     * @returns {UserSchema}
     */
    toUserSchema() {
        return {
            _id: this.__id,
            email: this._email,
            password: this._password,
            firstname: this._firstname,
            lastname: this._lastname,
            createdAt: this._createdAt,
            modifiedAt: this._modifiedAt
        };
    }

    /**
     * Update user information
     * @param {object} data New user data
     * @param {string} [data.email]
     * @param {string} [data.password]
     * @param {string} [data.firstname]
     * @param {string} [data.lastname]
     */
    updateUser(data) {
        if (data.email) {
            this.email = data.email;
        }
        if (data.password) {
            this.password = data.password;
        }
        if (data.firstname) {
            this.firstname = data.firstname;
        }
        if (data.lastname) {
            this.lastname = data.lastname;
        }
    }

    /**
     * @returns {string} User's ID
     */
    get _id() {
        return this.__id;
    }

    /**
     * @returns {string}
     */
    get email() {
        return this._email;
    }

    /**
     * @returns {string}
     */
    get password() {
        return this._password;
    }

    /**
     * @returns {string}
     */
    get firstname() {
        return this._firstname;
    }

    /**
     * @returns {string}
     */
    get lastname() {
        return this._lastname;
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
     * @param {string} newEmail
     */
    set email(newEmail) {
        if (this._email === newEmail) {
            return;
        }
        this._email = newEmail;
        this.modified();
    }

    /**
     * @param {string} newPassword
     */
    set password(newPassword) {
        if (this._password === newPassword) {
            return;
        }
        this._password = newPassword;
        this.modified();
    }

    /**
     * @param {string} newFirstname
     */
    set firstname(newFirstname) {
        if (this._firstname === newFirstname) {
            return;
        }
        this._firstname = newFirstname;
        this.modified();
    }

    /**
     * @param {string} newLastname
     */
    set lastname(newLastname) {
        if (this._lastname === newLastname) {
            return;
        }
        this._lastname = newLastname;
        this.modified();
    }
};