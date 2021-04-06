const Post = require("../Models/Post");
const User = require("../Models/User");

class PostController {
  static async getPosts(req, res, next) {
    try {
      const posts = await Post.find({}).populate("comments");

      res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
    }
  }

  static async getPost(req, res, next) {
    try {
      const { postId } = req.params;

      const post = await Post.find({ _id: postId }).populate("comments");

      res.status(200).json({ post });
    } catch (err) {
      console.log(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      let { title, description } = req.body;
      const userId = req.dataUser;
      const user = await User.findOne({ _id: userId });

      const newPost = new Post({
        title,
        description,
        user,
      });

      await newPost.save();
      await User.findByIdAndUpdate(
        user._id,
        { posts: [...user.posts, newPost] },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json(newPost);
    } catch (err) {
      console.log(err);
    }
  }

  static async updatePost(req, res, next) {
    try {
      let { title, description } = req.body;
      const postId = req.params.id;
      const updatedPost = {
        title,
        description,
      };

      await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true,
        useFindAndModify: false,
      });
      res.status(200).json({ message: "Post updated" });
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const postId = req.params.id;

      const deletePost = await Post.findByIdAndDelete(postId);

      if (!deletePost) res.status(404).json({ message: "No post found" });
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PostController;
