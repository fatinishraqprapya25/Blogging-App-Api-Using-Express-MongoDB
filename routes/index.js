const adminRouter = require("../modules/admin/admin.route");
const blogRouter = require("../modules/blogs/blogs.route");
const commentRouter = require("../modules/comment/comment.route");
const userRouter = require("../modules/users/users.routes");
const router = require("express").Router();

const routes = [
    { path: "/user", module: userRouter },
    { path: "/admin", module: adminRouter },
    { path: "/blogs", module: blogRouter },
    { path: "/comments", module: commentRouter }
]

routes.forEach(r => router.use(r.path, r.module));
module.exports = router;