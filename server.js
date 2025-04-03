const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

let server;

async function main() {
    try {
        await mongoose.connect(config.databaseUrl);
        server = app.listen(config.port, console.log("Server listening at port ", config.port));
        cloudinary.config({
            cloud_name: config.cloudinaryName,
            api_key: config.cloudinaryApiKey,
            api_secret: config.cloudinaryApiSecret
        });
    } catch (err) {
        console.log(err);
    }
}

main();