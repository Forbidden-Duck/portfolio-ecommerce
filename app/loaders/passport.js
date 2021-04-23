const passport = require("passport");
const LocalStrategy = require("passport-local");
const { MongoService } = require("./mongodb");

/**
 * @param {*} app 
 * @param {MongoService} MongoDB 
 * @returns 
 */
module.exports = (app, MongoDB) => {
    const AuthService = MongoDB.services.auth;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        done(null, { id });
    });
    passport.use(new LocalStrategy(
        async (email, password, done) => {
            try {
                const user = await AuthService.login({ email, password });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        };
    ));
    return passport
};