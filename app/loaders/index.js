const expressLoader = require("./express");
const mongodbLoader = require("./mongodb");
const passportLoader = require("./passport");
const routeLoader = require("../routes");
const swaggerLoader = require('./swagger');

module.exports = async app => {
    const expressApp = await expressLoader(app);
    const MongoDB = await mongodbLoader();
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);
    await swaggerLoader(app);
    app.use((err, req, res, next) => {
        const { message, status } = err;
        return res.status(status).send({ message });
    });
};