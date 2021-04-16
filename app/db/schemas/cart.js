/**
 * @typedef {object} Cart
 * @property {string} [_id]
 * @property {CartItem[]} [items]
 * @property {number} [createdAt]
 * @property {number} [modifiedAt]
 */

/**
 * @typedef {object} CartItem
 * @property {string} [_id]
 * @property {string} [productid]
 * @property {number} [createdAt]
 * @property {number} [modifiedAt]
 */

/**
 * @type {Cart}
 */
module.exports = {
    _id: undefined,
    items: [],
    createdAt: undefined,
    modifiedAt: undefined
};