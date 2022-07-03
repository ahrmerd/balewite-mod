<template>
  <div class="page">
    <div class="form">
      <h3 class="title">Login</h3>
      <form action="" @submit.prevent="login">
        <div class="form-item">
          <span class="icon"></span>
          <input
            v-model="username"
            :class="username !== '' ? 'filled' : ''"
            required
            placeholder="your username"
          />
          <label>Email</label>
        </div>
        <div class="form-item">
          <span class="icon"></span>
          <input
            placeholder="your password"
            v-model="password"
            :class="password !== '' ? 'filled' : ''"
            type="password"
            required
          />
          <label>Password</label>
        </div>
        <button class="submit-button">login</button>
      </form>
      <div class="other-links">
        <a href="">forget password</a>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";
import { ref } from "vue";
const username = ref("");
const password = ref("");
const router = useRouter();
const login = async () => {
  await AuthService.LoginUser({
    username: username.value,
    password: password.value,
  });
  router.push({ name: "Home" });
};
</script>

<style lang="scss" scoped>
</style>