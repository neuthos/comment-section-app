<template>
  <div>
    <!-- POST -->
    <div class="newPost-container">
      <div class="comment-section">
        <h2>What's happening?</h2>
      </div>
      <div class="comment-form">
        <form @submit.prevent="comment">
          <input type="text" placeholder="Title" v-model="input.title" />
          <div class="post-btn">
            <textarea
              :placeholder="`Description`"
              v-model="input.description"
            ></textarea>
            <button
              @click.prevent="createPost"
              style="background-color: #65eab6"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- STATUS  -->
    <div class="main-container">
      <!-- CARD  -->
      <StatusCard v-for="post in getPosts" :key="post._id" :post="post" />
    </div>
  </div>
</template>
<script>
import StatusCard from "../components/StatusCard";
export default {
  data: () => ({
    input: {
      title: "",
      description: "",
    },
  }),

  methods: {
    createPost() {
      this.$store.dispatch("createPost", {
        newPost: this.input,
        access_token: localStorage.access_token,
      });

      this.input.title = "";
      this.input.description = "";
    },
  },

  components: {
    StatusCard,
  },

  created() {
    this.$store.dispatch("fetchPosts");

    if (localStorage.access_token) {
      this.$store.commit("setIsLogin", true);
    }
  },

  computed: {
    getPosts() {
      return this.$store.state.posts;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body {
  height: 100vh;
}

/* CONTAINER  */

.main-container {
  background-color: #399689;
  width: 80%;
  min-height: 600px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6rem 2rem 2rem 2rem;
  box-sizing: border-box;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 100px 80px #eeeeee;
  display: flex;
  flex-direction: column;
}

.newPost-container {
  background-color: #399689;
  margin-top: 2rem;
  border-radius: 20px;
  flex-direction: column;
  padding: 10px;
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

/* CARD  */

.card {
  display: flex;
  background-color: white;
  width: 900px;
  margin-top: 1.5rem !important;
  margin: 1rem auto;
  box-shadow: 0 0 5px gray;
  border-radius: 10px;
  padding: 1rem 0;
  cursor: pointer;
}

.card-avatar {
  width: 20%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}

.card-avatar img {
  width: 70%;
  margin-top: 0.5rem;
}

.card-avatar p {
  margin-top: 0.5rem;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.card-body {
  width: 80%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-body h3 {
  margin-bottom: 1rem;
  font-size: 2em;
}

.card-body p {
  font-size: 1em;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* POST  */
.comment-section {
  width: 900px;
  margin: 1rem auto;
  display: flex;
}

.comment-section div {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  width: 80%;
}

.comment-form {
  width: 80%;
  margin: 1rem auto 0;
}

.comment-form input {
  border-radius: 5px;
  padding: 0.5rem;
  background-color: white;
  width: 100%;
}

.comment-form textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  border-radius: 1px solid #c8c8c8;
  background-color: white;
  margin-bottom: 20px;
  resize: none;
}

.post-btn {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.post-btn button {
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  width: 100px;
  background-color: #010620;
  color: white;
  cursor: pointer;
  height: 100%;
}
</style>
