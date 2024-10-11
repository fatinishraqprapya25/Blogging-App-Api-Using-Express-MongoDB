const userRouter = require("../modules/users/users.routes");
const router = require("express").Router();

const routes = [
    { path: "/user", module: userRouter }
]

routes.forEach(r => router.use(r.path, r.module));
module.exports = router;