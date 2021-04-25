module.exports = (app, passport, MongoDB) => {
    require("../routes/auth")(app, passport, MongoDB);
};