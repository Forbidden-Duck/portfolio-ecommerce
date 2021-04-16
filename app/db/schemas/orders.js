/**
 * @typedef {object} Orders
 * @property {string} [_id]
 * @property {string} [userid]
 * @property {number} [status]
 * @property {number} [total]
 * @property {OrderItem[]} [items]
 * @property {number} [createdAt]
 * @property {number} [modifiedAt]
 */

/**
 * @typedef {object} OrderItem
 * @property {string} [_id]
 * @property {string} [productid]
 * @property {number} [quantity]
 * @property {number} [price]
 * @property {number} [createdAt]
 * @property {number} [modifiedAt]
 */

/**
 * @type {Orders}
 */
module.exports = {
    _id: undefined,
    userid: undefined,
    status: undefined,
    total: undefined,
    items: [],
    createdAt: undefined,
    modifiedAt: undefined
};