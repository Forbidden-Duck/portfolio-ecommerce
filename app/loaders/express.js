const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const { SESSION_SECRET } = require("../../config");

module.exports = app => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("trust proxy", 1);
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 100
        }
    }));
    app.use(morgan("dev"));
    app.use(passport.initialize());
    app.use(passport.session());
    return app;
};