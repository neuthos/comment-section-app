<template>
  <nav v-if="isLogin">
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      mini-variant
      mini-variant-width="100"
      class="teal"
    >
      <v-list>
        <v-list-item class="mb-12">
          <v-list-item-content>
            <v-icon class="mb-2" large>fas fa-comment</v-icon>
            <v-list-item-subtitle align="center">Neu</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list flat>
        <v-list-item router to="/">
          <v-list-item-content @click.prevent="home">
            <v-icon class="mb-2">fas fa-home</v-icon>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list style="position: absolute; bottom: 0" class="ml-3" flat>
        <v-list-item router to="/">
          <v-list-item-action @click.prevent="logout">
            <v-icon right>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
  }),

  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$store.commit("setIsLogin", false);
      this.$router.push({ name: "Login" });
    },
    home() {
      this.$router.push({ name: "MyPosts" });
    },
  },

  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>