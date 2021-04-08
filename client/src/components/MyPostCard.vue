<template>
  <div class="my-card">
    <div class="card-avatar">
      <img
        :src="`https://avatars.dicebear.com/api/avataaars/${post.user.username}.svg?style=circle`"
        alt="avatar"
        @click.prevent="toDetailPost"
      />
      <p>{{ post.user.username }}</p>
    </div>
    <div class="card-body">
      <h3 v-if="stepEdit === 1">
        {{ post.title }}
        <i class="fas fa-edit action-btn" @click.prevent="editPost"></i>
      </h3>
      <p style="color: #536162">{{ getDate }}</p>
      <div v-if="stepEdit === 2 && post._id === id" style="width: 250px">
        <v-textarea
          auto-grow
          rounded
          outlined
          height="5px"
          width="200px"
          label="Title"
          v-model="input.title"
        />
      </div>

      <p v-if="stepEdit === 1" style="font-size: 1.3rem">
        {{ post.description }}
      </p>

      <v-textarea
        v-if="stepEdit === 2 && post._id === id"
        label="Description"
        auto-grow
        rounded
        outlined
        height="5px"
        width="200px"
        v-model="input.description"
      />
      <div v-if="stepEdit === 2 && post._id === id" style="width: 350px">
        <v-btn
          rounded
          color="green accent-3"
          dark
          class="btn-margin"
          @click.prevent="updatePost"
          >Update</v-btn
        >
        <v-btn
          rounded
          color="red accent-3"
          dark
          class="btn-margin"
          @click.prevent="deletePost"
          >Delete</v-btn
        >
        <v-btn
          rounded
          color="grey accent-3"
          dark
          class="btn-margin"
          @click.prevent="cancelEdit"
          >Cancel</v-btn
        >
      </div>
      <p v-if="stepEdit === 1" class="card-footer" style="color: #536162">
        {{ post.comments.length }} comment
      </p>
    </div>

    <div></div>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  props: ["post"],

  data() {
    return {
      stepEdit: 1,
      id: "",
      input: {
        title: this.post.title,
        description: this.post.description,
      },
    };
  },

  computed: {
    getDate() {
      let d = new Date(this.post.created_at);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    },
  },

  methods: {
    toDetailPost() {
      router.push(`/post/${this.post._id}`);
    },
    editPost() {
      this.stepEdit++;
      this.id = this.post._id;
    },

    cancelEdit() {
      this.stepEdit--;
      this.id = "";
    },

    updatePost() {
      this.$store.dispatch("updatePost", {
        postId: this.post._id,
        access_token: localStorage.access_token,
        data: this.input,
      });
      this.stepEdit--;
      this.id = "";
    },

    deletePost() {
      this.$store.dispatch("deletePost", {
        postId: this.post._id,
        access_token: localStorage.access_token,
      });
      this.stepEdit--;
      this.id = "";
    },
  },
};
</script>

<style scoped>
.card-footer {
  align-items: flex-end;
}
.my-card {
  display: flex;
  background-color: white;
  width: 900px;
  margin-top: 1.5rem !important;
  margin: 1rem auto;
  box-shadow: 0 0 5px gray;
  border-radius: 10px;
  padding: 1rem 0;
}

.action-btn {
  font-size: 20px;
  visibility: visible;
  cursor: pointer;
}

.card-avatar img {
  cursor: pointer;
}
</style>
