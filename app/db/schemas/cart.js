/**
 * @typedef {object} Cart
 * @property {string} [_id]
 * @property {CartItem[]} [items]
 * @property {string} [createdAt]
 * @property {string} [modifiedAt]
 */

/**
 * @typedef {object} CartItem
 * @property {string} [_id]
 * @property {string} [productid]
 * @property {string} [createdAt]
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

/**
 * @type {CartItem}
 */
module.exports.CartItemSchema = {
    _id: undefined,
    productid: undefined,
    createdAt: undefined
};