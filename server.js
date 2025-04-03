const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");

let server;

async function main() {
    try {
        await mongoose.connect(config.databaseUrl);
        server = app.listen(config.port, console.log("Server listening at port ", config.port));
    } catch (err) {
        console.log(err);
    }
}

main();