/**
 * @typedef {object} Cart
 * @property {string} [_id]
 * @property {string} [userid]
 * @property {CartItem[]} [items]
 * @property {string} [createdAt]
 * @property {string} [modifiedAt]
 */

/**
 * @typedef {object} CartItem
 * @property {string} [_id]
 * @property {number} [quantity]
 * @property {number} [price]
 * @property {string} [productid]
 * @property {string} [createdAt]
 * @property {string} [modifiedAt]
 */

/**
 * @type {Cart}
 */
module.exports = {
    _id: undefined,
    userid: undefined,
    items: [],
    createdAt: undefined,
    modifiedAt: undefined
};

/**
 * @type {CartItem}
 */
module.exports.CartItemSchema = {
    _id: undefined,
    quantity: undefined,
    price: undefined,
    productid: undefined,
    createdAt: undefined,
    modifiedAt: undefined
};