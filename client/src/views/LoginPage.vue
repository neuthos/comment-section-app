<template>
  <v-app id="inspire" style="background-color: #399689">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <!-- LOGIN  -->
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Login
                        </h1>

                        <v-form class="login-container">
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            v-model="inputLogin.email"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            v-model="inputLogin.password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          dark
                          class="btn-margin"
                          @click.prevent="login"
                          >LOGIN</v-btn
                        >
                      </div>
                    </v-col>
                    <!-- END LOGIN  -->
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5 class="text-center">Not have account? Register!</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="switchToRegister"
                          >REGISTER</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="switchToLogin"
                          >Login</v-btn
                        >
                      </div>
                    </v-col>
                    <!-- REGISTER  -->
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Register
                        </h1>
                        <h4
                          v-for="err in errorMsg"
                          :key="err.id"
                          class="text-center mt-4 error-text"
                        >
                          {{ err }}
                        </h4>
                        <v-form class="login-container">
                          <v-text-field
                            label="Username"
                            name="Username"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            v-model="inputRegister.username"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            v-model="inputRegister.email"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            v-model="inputRegister.password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          dark
                          class="btn-margin"
                          @click.prevent="register"
                          >Register</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    step: 1,
    inputRegister: {
      username: "",
      email: "",
      password: "",
    },
    inputLogin: {
      email: "",
      password: "",
    },
  }),

  methods: {
    register() {
      this.$store.dispatch("handleRegister", this.inputRegister);
      this.inputRegister.username = "";
      this.inputRegister.email = "";
      this.inputRegister.password = "";
    },

    login() {
      this.$store.dispatch("handleLogin", this.inputLogin);
      this.inputLogin.email = "";
      this.inputLogin.password = "";
    },

    switchToRegister() {
      this.step++;
      this.inputLogin.email = "";
      this.inputLogin.password = "";
      this.$store.commit("setErrorMsg", []);
    },

    switchToLogin() {
      this.step--;
      this.inputRegister.username = "";
      this.inputRegister.email = "";
      this.inputRegister.password = "";
      this.$store.commit("setErrorMsg", []);
    },
  },

  computed: {
    errorMsg() {
      return this.$store.state.errorMsg;
    },
  },
};
</script>

<style scoped >
.login-container {
  padding: 5%;
}
.btn-margin {
  margin-bottom: 20px;
}

.error-text {
  color: red;
}
</style>
