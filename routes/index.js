const adminRouter = require("../modules/admin/admin.route");
const blogRouter = require("../modules/blogs/blogs.route");
const userRouter = require("../modules/users/users.routes");
const router = require("express").Router();

const routes = [
    { path: "/user", module: userRouter },
    { path: "/admin", module: adminRouter },
    { path: "/blog", module: blogRouter }
]

routes.forEach(r => router.use(r.path, r.module));
module.exports = router;