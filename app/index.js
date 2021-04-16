const app = require("express")();
const loaders = require("./loaders");
const { PORT } = require("../config");

(async () => {
    loaders(app);
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})();