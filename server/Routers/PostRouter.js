const PostRouter = require("express").Router();
const PostController = require("../Controllers/PostController");
const authenticate = require("../middlewares/authentication");

PostRouter.get("/", PostController.getPosts);
PostRouter.get("/post/:postId", PostController.getPost);

PostRouter.post("/post", authenticate, PostController.createPost);
PostRouter.put("/post/:id", authenticate, PostController.updatePost);
PostRouter.delete("/post/:id", authenticate, PostController.deletePost);

module.exports = PostRouter;
