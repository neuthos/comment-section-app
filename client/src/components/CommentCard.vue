<template>
  <div class="card-comment">
    <div class="comment-container">
      <div class="card-comment-img">
        <img
          :src="`https://avatars.dicebear.com/api/avataaars/${comment.name}.svg?style=circle`"
          alt="avatar"
        />
        <p>{{ comment.name }}</p>
        <i
          v-if="replyFlag === '' || replyFlag !== comment._id"
          style="
            position: relative;
            bottom: -20px;
            font-size: 25px;
            color: #399689;
            cursor: pointer;
          "
          class="fas fa-caret-down"
          @click.prevent="showReply"
        ></i>
        <i
          v-else-if="replyFlag === comment._id"
          style="
            position: relative;
            bottom: -20px;
            font-size: 25px;
            color: #399689;
            cursor: pointer;
          "
          class="fas fa-caret-up"
          @click.prevent="showReply"
        ></i>
      </div>

      <div class="card-comment-desc">
        <p v-if="!editCommentFlag" style="font-size: 1.2rem">
          {{ comment.text }}
        </p>
        <div v-if="editCommentFlag" style="display: flex">
          <v-textarea
            auto-grow
            rounded
            outlined
            height="10px"
            width="150px"
            v-model="text"
          />

          <div
            style="
              margin-left: 20px;
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
            "
          >
            <v-btn
              rounded
              color="green accent-3"
              dark
              class="btn-margin"
              @click.prevent="updateComment"
              >Update</v-btn
            >
            <v-btn
              rounded
              color="red accent-3"
              dark
              class="btn-margin"
              @click.prevent="deleteComment"
              >Delete</v-btn
            >
            <v-btn
              rounded
              color="grey accent-3"
              dark
              class="btn-margin"
              @click.prevent="ShowEditComment"
              >Cancel</v-btn
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="replyFlag === comment._id">
      <ReplyCard
        v-for="(reply, index) in comment.reply"
        :key="reply._id"
        :i="index"
        :commentId="comment._id"
        class="reply-container"
      />
      <div class="btn-reply">
        <v-btn
          rounded
          color="teal accent-3"
          dark
          style="margin: 10px 10px 0 0"
          @click.prevent="addReply"
          >Reply</v-btn
        >

        <v-textarea
          auto-grow
          rounded
          outlined
          height="10px"
          width="200px"
          v-model="replyText"
        />
        <i
          v-if="name === comment.name"
          class="fas fa-edit comment-btn-edit"
          @click.prevent="ShowEditComment"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyCard from "./ReplyCard";

export default {
  props: ["comment"],

  data() {
    return {
      replyText: "",
      editCommentFlag: false,
      name: localStorage.name,
      text: this.comment.text,
    };
  },

  components: {
    ReplyCard,
  },

  methods: {
    addReply() {
      this.$store.dispatch("addReply", {
        commentId: this.comment._id,
        access_token: localStorage.access_token,
        text: this.replyText,
        postId: this.comment.post,
      });
      this.replyText = "";
    },

    showReply() {
      if (this.$store.state.replyFlag === "") {
        this.$store.commit("setReplyFlag", this.comment._id);
      } else {
        this.$store.commit("setReplyFlag", "");
      }
    },

    deleteComment() {
      this.$store.dispatch("deleteComment", {
        access_token: localStorage.access_token,
        commentId: this.comment._id,
        postId: this.comment.post,
      });
    },

    updateComment() {
      this.$store.dispatch("updateComment", {
        access_token: localStorage.access_token,
        postId: this.comment.post,
        text: this.text,
        commentId: this.comment._id,
      });

      this.editCommentFlag = false;
    },

    ShowEditComment() {
      if (this.editCommentFlag) {
        this.editCommentFlag = false;
      } else {
        this.editCommentFlag = true;
      }
    },
  },

  computed: {
    replyFlag() {
      return this.$store.state.replyFlag;
    },
  },
};
</script>

<style>
.card-comment {
  display: flex;
  flex-direction: column;
  width: 900px;
  margin-bottom: 1rem;
  background-color: white;
  padding: 20px;
}

.comment-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}

.reply-container {
  display: flex;
  margin-left: auto;
}

.btn-reply {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  cursor: pointer;
  width: 90%;
}

.card-comment-img {
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -20px;
}

.card-comment-img p {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-bottom: 0;
}

.card-comment-img img {
  height: 50px;
}

.card-comment-desc {
  width: 900px;
  display: flex;
  align-items: center;
}

.card-comment-desc p {
  margin-left: 10px;
  margin-top: 10px;
}

.comment-btn-edit {
  font-size: 20px;
  visibility: visible;
  cursor: pointer;
  display: flex;
  padding: 20px 0px 20px 40px;
}
</style>