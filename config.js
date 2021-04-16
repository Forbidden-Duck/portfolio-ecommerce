module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB: {
        name: process.env.DB.NAME,
        host: process.env.DB.HOST,
        auth: {
            username: process.env.DB.USERNAME,
            password: process.env.DB.PASSWORD
        }
    }
}