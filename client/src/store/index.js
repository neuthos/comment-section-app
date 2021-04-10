import Vue from "vue";
import Vuex from "vuex";
import axios from "../api/axios";
import router from "../router/index";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    errorMsg: [],
    posts: [],
    post: {},
    comments: [],
    reply: [],
    myPosts: {},
    comment: {},
    replyFlag: "",
    user: "",
  },
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload;
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setPost(state, payload) {
      state.post = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
    setReply(state, payload) {
      state.reply = payload;
    },
    setMyPosts(state, payload) {
      state.myPosts = payload;
    },
    setComment(state, payload) {
      state.comment = payload;
    },
    setReplyFlag(state, payload) {
      state.replyFlag = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    handleRegister(context, user) {
      return axios({
        method: "POST",
        url: "/register",
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      })
        .then((data) => {
          console.log(data);
          Swal.fire(
            "Account registered",
            "Login to start using this application",
            "success"
          );
          context.commit("setErrorMsg", []);
        })
        .catch(({ response }) => {
          context.commit("setErrorMsg", response.data.error);
        });
    },

    handleLogin(context, user) {
      return axios({
        method: "POST",
        url: "/login",
        data: {
          email: user.email,
          password: user.password,
        },
      })
        .then(({ data }) => {
          context.commit("setIsLogin", true);
          localStorage.name = data.user.username;
          localStorage.access_token = data.access_token;
          router.push("/");
        })
        .catch(({ response }) => {
          console.log(response);
          Swal.fire("Error Login", "Invalid Email or Password", "error");
        });
    },

    fetchPosts(context) {
      return axios({
        method: "GET",
        url: "/",
      })
        .then(({ data }) => {
          context.commit("setPosts", data.posts);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    fetchMyPosts(context, token) {
      return axios({
        method: "GET",
        url: "/my-posts",
        headers: { access_token: token },
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setMyPosts", data.data[0].posts);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchPost(context, payload) {
      return axios({
        method: "GET",
        url: `/post/${payload.id}`,
        headers: { access_token: payload.access_token },
      })
        .then(({ data }) => {
          context.commit("setPost", data.post[0]);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    createPost(context, payload) {
      return axios({
        method: "POST",
        url: "/post",
        data: {
          title: payload.newPost.title,
          description: payload.newPost.description,
        },
        headers: { access_token: payload.access_token },
      })
        .then(() => {
          context.dispatch("fetchPosts");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error", "Error while create post", "error");
        });
    },

    updatePost(context, payload) {
      return axios({
        method: "PUT",
        url: `/post/${payload.postId}`,
        headers: { access_token: payload.access_token },
        data: {
          title: payload.data.title,
          description: payload.data.description,
        },
      })
        .then(({ data }) => {
          console.log(data);
          context.dispatch("fetchMyPosts", payload.access_token);
          Swal.fire("Succes", "Update success", "success");
        })
        .catch(({ response }) => {
          console.log(response);
          context.commit("setErrorMsg", response.data.error);
          Swal.fire("Error", "Error while updating", "error");
        });
    },

    deletePost(context, payload) {
      return axios({
        method: "DELETE",
        url: `/post/${payload.postId}`,
        headers: { access_token: payload.access_token },
      })
        .then((data) => {
          console.log(data);
          context.dispatch("fetchMyPosts", payload.access_token);
          Swal.fire("Succes", "Post deleted", "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error", "Error while deleting", "error");
        });
    },

    getComment(context, payload) {
      return axios({
        method: "GET",
        url: `/comment/${payload.commentId}`,
        headers: { access_token: localStorage.access_token },
      })
        .then(({ data }) => {
          console.log(data.comment);
          context.commit("setComment", data.comment[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addComment(context, payload) {
      return axios({
        method: "POST",
        url: `/comment/${payload.postId}`,
        headers: { access_token: payload.access_token },
        data: {
          text: payload.text,
        },
      })
        .then(() => {
          context.dispatch("fetchPost", {
            id: payload.postId,
            access_token: payload.access_token,
          });
          Swal.fire("Succes", "Add success", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addReply(context, payload) {
      return axios({
        method: "POST",
        url: `/reply/${payload.commentId}`,
        headers: { access_token: localStorage.access_token },
        data: {
          text: payload.text,
        },
      })
        .then(() => {
          context.dispatch("fetchPost", {
            id: payload.postId,
            access_token: payload.access_token,
          });
          Swal.fire("Succes", "Add success", "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error", "Error while add reply", "error");
        });
    },

    updateComment(context, payload) {
      return axios({
        method: "PUT",
        url: `/comment/${payload.commentId}`,
        headers: { access_token: payload.access_token },
        data: {
          text: payload.text,
        },
      })
        .then(() => {
          context.dispatch("fetchPost", {
            id: payload.postId,
            access_token: payload.access_token,
          });
          Swal.fire("Succes", "Update success", "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error", "Error while Updating", "error");
        });
    },

    deleteComment(context, payload) {
      return axios({
        method: "DELETE",
        url: `/comment/${payload.commentId}`,
        headers: { access_token: payload.access_token },
      })
        .then(() => {
          context.dispatch("getComment", {
            access_token: localStorage.access_token,
            commentId: payload.commentId,
          });

          context.dispatch("fetchPost", {
            id: payload.postId,
            access_token: payload.access_token,
          });

          Swal.fire("Succes", "Comment deleted", "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error", "Error while deleting", "error");
        });
    },
  },
  modules: {},
});
