<script lang="ts" setup>
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";
import { isLoggedIn } from "@/utils/auth";
const signOut = async () => {
  const router = useRouter();
  await AuthService.LogoutUser();
  router.push({ name: "Register" });
};
isLoggedIn;
</script>
<template>
  <div class="nav-links">
    <template v-if="isLoggedIn()">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Announcements' }">Announcements</router-link>
      <router-link :to="{ name: 'Articles' }">Articles</router-link>

      <router-link :to="{ name: 'Courses' }">Courses</router-link>
      <button class="btn" @click="signOut">sign out</button>
    </template>

    <template v-else>
      <router-link :to="{ name: 'Register' }">Register</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link></template
    >
  </div>
</template>

<style lang="scss" scoped>
.nav-links {
  background-color: rgb(182, 181, 181);
  display: flex;
  flex-direction: column;
  top: 4rem;
  bottom: 0;
  overflow-y: auto;
  // min-height: 120vh;
  justify-content: space-evenly;
  width: 70%;
  padding: 1rem;

  right: 0;
  left: 0;
  position: fixed;
  margin-right: 3rem;

  a {
    padding: 0.75rem;
    box-shadow: 0 1px 4px rgba(146, 161, 176, 0.35);
    text-decoration: none;
    text-transform: capitalize;
    color: var(--primary-color);
    margin-bottom: 0.3rem;
    transition: color 0.3s ease-in-out;
    transition: transform 0.4s ease-in-out;
    // text-align: center;
    &:hover {
      background-color: var(--primary-color);
      color: white;
      font-weight: bold;
      display: inline-block;
      transform: scale(1.04);
    }
    &.router-link-active {
      cursor: not-allowed;
      font-weight: 700;
      text-decoration: underline;
    }
    @media screen and (min-width: 768px) {
      //   box-shadow: none;
      box-shadow: 0 4px 2px -2px rgba(182, 182, 182, 0.75);
    }
  }
}
</style>
