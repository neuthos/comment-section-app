<template>
  <div class="card" @click.prevent="toDetailPost">
    <div class="card-avatar">
      <img
        :src="`https://avatars.dicebear.com/api/avataaars/${post.user.username}.svg?style=circle`"
        alt="avatar"
      />
      <p>{{ post.user.username }}</p>
    </div>
    <div class="card-body">
      <h3>{{ post.title }}</h3>
      <p style="color: #536162">{{ getDate }}</p>
      <p style="font-size: 1.3rem">{{ post.description }}</p>
      <p style="color: #536162" class="card-footer">
        {{ post.comments.length }} Comment
      </p>
    </div>

    <div></div>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  props: ["post"],

  methods: {
    toDetailPost() {
      router.push(`/post/${this.post._id}`);
    },
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
};
</script>

<style scoped>
.card-footer {
  align-items: flex-end;
}
</style>
