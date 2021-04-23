module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB: {
        name: process.env.DBNAME,
        host: process.env.DBHOST,
        auth: {
            username: process.env.DBUSERNAME,
            password: process.env.DBPASSWORD
        }
    },
    STRIPE: process.env.SKTEST
}