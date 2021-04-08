<template>
  <div class="card-reply">
    <div class="card-reply-img">
      <img
        :src="`https://avatars.dicebear.com/api/avataaars/${getCommentData.reply[i].name}.svg?style=circle`"
        alt="avatar"
      />
      <p style="color: #536162">
        {{ getCommentData.reply[i].name }}
      </p>
    </div>

    <div class="card-reply-desc" style="font-size: 1.2rem">
      <p>
        {{ getCommentData.reply[i].text }}
      </p>
    </div>

    <i
      style="
        position: relative;
        bottom: -25px;
        font-size: 20px;
        color: red;
        cursor: pointer;
      "
      class="fas fa-trash-alt"
      @click.prevent="deleteReply"
      v-if="name === getCommentData.reply[i].name"
    ></i>
  </div>
</template>

<script>
export default {
  props: ["commentId", "i"],

  data() {
    return {
      name: localStorage.name,
    };
  },

  methods: {
    deleteReply() {
      this.$store.dispatch("deleteComment", {
        access_token: localStorage.access_token,
        commentId: this.getCommentData.reply[this.i]._id,
        postId: this.getCommentData.post,
      });
      this.$store.dispatch("getComment", {
        commentId: this.commentId,
        access_token: localStorage.access_token,
      });

      this.$store.state.replyFlag = "";
    },
  },

  computed: {
    getCommentData() {
      return this.$store.state.comment;
    },

    getUser() {
      return this.$store.state.user;
    },
  },

  created() {
    this.$store.dispatch("getComment", {
      commentId: this.commentId,
      access_token: localStorage.access_token,
    });
  },
  beforeUpdated() {
    this.$store.commit("setComment", {});
  },
};
</script>

<style scoped>
.card-reply {
  display: flex;
  width: 800px;
  margin-bottom: 1rem;
  background-color: whitesmoke;
  padding: 20px;
}

.card-reply-img {
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-reply-img p {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-bottom: 0;
}

.card-reply-img img {
  height: 50px;
}

.card-reply-desc {
  width: 900px;
  display: flex;
  align-items: center;
}

.card-reply-desc p {
  margin-left: 10px;
  margin-top: 10px;
}
</style>