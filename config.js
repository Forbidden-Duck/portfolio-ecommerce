module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB: {
        NAME: process.env.DB.NAME,
        HOST: process.env.DB.HOST,
        AUTH: {
            USERNAME: process.env.DB.USERNAME,
            PASSWORD: process.env.DB.PASSWORD
        }
    }
}