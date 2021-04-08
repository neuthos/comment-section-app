<template>
  <div class="container">
    <div class="back" @click.prevent="backToHome">
      <i class="fas fa-caret-square-left"></i>
    </div>

    <div class="detail-container">
      <div class="main-container">
        <div style="margin: 2rem 0"></div>
        <div class="card" style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row">
            <div class="card-avatar">
              <img
                :src="`https://avatars.dicebear.com/api/avataaars/${getPost.user.username}.svg?style=circle`"
                alt="avatar"
              />
              <p>{{ getPost.user.username }}</p>
            </div>

            <!-- COMMENT -->
            <div class="card-body-detail">
              <h3 style="font-size: 2rem">{{ getPost.title }}</h3>
              <p style="color: #536162">{{ getDate }}</p>
              <p style="font-size: 1.3rem">{{ getPost.description }}</p>
            </div>
          </div>

          <div class="btn-reply">
            <v-btn
              rounded
              color="teal accent-3"
              dark
              style="margin: 10px 10px 0 0"
              @click.prevent="commentPost"
              >Reply</v-btn
            >
            <v-textarea
              auto-grow
              rounded
              outlined
              height="10px"
              width="200px"
              v-model="commentText"
            />
          </div>
        </div>

        <!-- comment -->

        <div class="comment-list">
          <CommentCard
            v-for="comment in getPost.comments"
            :key="comment._id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from "../components/CommentCard";
export default {
  name: "Detail",
  data() {
    return {
      commentText: "",
    };
  },

  methods: {
    backToHome() {
      this.$router.push("/");
    },

    commentPost() {
      this.$store.dispatch("addComment", {
        postId: this.getPost._id,
        access_token: localStorage.access_token,
        text: this.commentText,
      });

      this.commentText = "";
    },
  },

  computed: {
    getPost() {
      return this.$store.state.post;
    },
    getDate() {
      let d = new Date(this.getPost.created_at);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    },
  },

  components: {
    CommentCard,
  },

  created() {
    this.$store.dispatch("fetchPost", {
      access_token: localStorage.access_token,
      id: this.$route.params.postId,
    });

    if (localStorage.access_token) {
      this.$store.commit("setIsLogin", true);
    }
  },
};
</script>

<style scoped>
.main-container {
  background-color: #399689;
  /* margin: auto; */
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

.card-body-detail {
  width: 80%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-list {
  width: 900px;
  margin: 2rem auto 0;
  padding-top: 1rem;
}

.back i {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 3em;
  cursor: pointer;
  color: black;
}

.detail-container {
  padding: 5rem;
  height: auto;
  background-color: white;
}

.detail-container h1 {
  font-size: 2em;
}
</style>
