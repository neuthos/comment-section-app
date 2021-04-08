<template>
  <div>
    <div class="back" @click.prevent="backToHome">
      <i class="fas fa-caret-square-left"></i>
    </div>
    <div class="dashboard-container">
      <PostCard v-for="post in getMyPosts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from "../components/MyPostCard";

export default {
  components: {
    PostCard,
  },

  methods: {
    backToHome() {
      this.$router.push("/");
    },
  },

  computed: {
    getMyPosts() {
      return this.$store.state.myPosts;
    },
  },

  created() {
    this.$store.dispatch("fetchMyPosts", localStorage.access_token);

    if (localStorage.access_token) {
      this.$store.commit("setIsLogin", true);
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #399689;
  width: 80%;
  min-height: 600px;
  position: absolute;
  top: 15%;
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

.back i {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 3em;
  cursor: pointer;
  color: black;
}

/* ================================ */
</style>>
