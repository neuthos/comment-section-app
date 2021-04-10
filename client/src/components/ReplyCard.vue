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
      <p v-if="!updateReplyFlag">
        {{ getCommentData.reply[i].text }}
      </p>
      <div v-if="updateReplyFlag" style="width: 80%; display: flex">
        <v-textarea
          auto-grow
          rounded
          outlined
          height="10px"
          width="80px"
          v-model="text"
        />
        <v-btn
          rounded
          color="green accent-3"
          dark
          class="btn-margin"
          @click.prevent="updateReply"
          style="margin-top: 10px; margin-left: 10px"
          >Update</v-btn
        >
      </div>
    </div>

    <i
      style="
        position: relative;
        bottom: -25px;
        font-size: 20px;
        color: black;
        cursor: pointer;
        margin-right: 10px;
      "
      class="fas fa-edit"
      @click.prevent="showUpdate"
      v-if="name === getCommentData.reply[i].name"
    ></i>

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
      updateReplyFlag: false,
      text: "",
    };
  },

  methods: {
    deleteReply() {
      this.$store.dispatch("deleteComment", {
        access_token: localStorage.access_token,
        commentId: this.getCommentData.reply[this.i]._id,
        postId: this.getCommentData.post,
      });

      this.$store.state.replyFlag = "";
    },
    showUpdate() {
      if (this.updateReplyFlag) {
        this.updateReplyFlag = false;
      } else {
        this.text = this.getCommentData.reply[this.i].text;
        this.updateReplyFlag = true;
      }
    },

    updateReply() {
      this.$store.dispatch("updateComment", {
        access_token: localStorage.access_token,
        commentId: this.getCommentData.reply[this.i]._id,
        postId: this.getCommentData.post,
        text: this.text,
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
    getTextRepy() {
      return this.getCommentData.reply[this.i].text;
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