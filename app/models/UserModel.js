const moment = require("moment");
const UserSchema = require("../db/schemas/users");
const { createID } = require("../db");

module.exports = class UserModel {
    /**
     * @param {UserSchema} data User data
     */
    constructor(data) {
        this._id = data.id || createID();
        this.email = data.email || "";
        this.password = data.password || "";
        this.firstname = data.firstname || "";
        this.lastname = data.lastname || "";
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
     * @returns {string}
     */
    fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    /**
     * @returns {UserSchema}
     */
    toUserSchema() {
        return {
            _id: this._id,
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt
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
        return this._id;
    }

    /**
     * @returns {string}
     */
    get email() {
        return this.email;
    }

    /**
     * @returns {string}
     */
    get password() {
        return this.password;
    }

    /**
     * @returns {string}
     */
    get firstname() {
        return this.firstname;
    }

    /**
     * @returns {string}
     */
    get lastname() {
        return this.lastname;
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
     * @param {string} newEmail
     */
    set email(newEmail) {
        if (this.email === newEmail) {
            return;
        }
        this.email = newEmail;
        this.modified();
    }

    /**
     * @param {string} newPassword
     */
    set password(newPassword) {
        if (this.password === newPassword) {
            return;
        }
        this.password = newPassword;
        this.modified();
    }

    /**
     * @param {string} newFirstname
     */
    set firstname(newFirstname) {
        if (this.firstname === newFirstname) {
            return;
        }
        this.firstname = newFirstname;
        this.modified();
    }

    /**
     * @param {string} newLastname
     */
    set lastname(newLastname) {
        if (this.lastname === newLastname) {
            return;
        }
        this.lastname = newLastname;
        this.modified();
    }
};