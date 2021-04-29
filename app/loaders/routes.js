module.exports = (app, passport, MongoDB) => {
    require("../routes/auth")(app, passport, MongoDB);
    require("../routes/user")(app, passport, MongoDB);
    require("../routes/product")(app, passport, MongoDB);
    require("../routes/order")(app, passport, MongoDB);
};