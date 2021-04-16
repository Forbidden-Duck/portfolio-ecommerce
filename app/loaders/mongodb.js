const Mongo = require("../db");
const DB = require("../../config");

module.exports = async () => {
    const MongoDB = await (new Mongo(DB))();
    return {
        client: MongoDB
    };
};