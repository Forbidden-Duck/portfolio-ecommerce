const passport = require("passport");
const LocalStrategy = require("passport-local");
const AuthService = require("../services/AuthService")();

module.exports = (app, MongoDB) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        done(null, { id });
    });
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await AuthService.login(MongoDB, { email: username, password });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        };
    ));
    return passport
};