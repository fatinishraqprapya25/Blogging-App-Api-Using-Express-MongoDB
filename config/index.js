const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    bcryptCircleCount: process.env.BCRYPT_CIRCLE_COUNT,
    jwtSecret: process.env.JWT_SECRET,
    defaultAdminEmail: process.env.DEFAULT_ADMIN
}