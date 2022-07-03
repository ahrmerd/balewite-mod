<script setup lang="ts">
import { ref, onMounted } from "vue";
import auth from "@/services/AuthService";
import { useRouter } from "vue-router";
import Rbuilder from "@/services/Rbuilder";
import { DepartmentI } from "@/types/interfaces";
const email = ref("");
const username = ref("");
const password = ref("");
const departmentId = ref("");
// const confirmPassword = ref("");
const phone = ref("");
const departments = ref([] as DepartmentI[]);
const router = useRouter();
onMounted(async () => {
  const data = await Rbuilder.make("departments").get();
  // console.log(data);
  departments.value = data;
  console.log(data);
});
const register = async () => {
  await auth.registerUser({
    email: email.value,
    username: username.value,
    password: password.value,
    phone: phone.value,
    department_id: departmentId.value,
  });
};
</script>

<template>
  <div class="page">
    <div class="form">
      <h3 class="title">Register</h3>
      <form action="" @submit.prevent="register">
        email field
        <div class="form-item">
          <span class="icon"></span>
          <input
            v-model="email"
            :class="email !== '' ? 'filled' : ''"
            type="email"
            name="email"
            id="email"
            required
          />
          <label for="">Email</label>
        </div>

        <!-- username field -->
        <div class="form-item">
          <span class="icon"></span>
          <input
            v-model="username"
            :class="username !== '' ? 'filled' : ''"
            type="text"
            required
            name="username"
          />
          <label for="username">username</label>
        </div>

        <!-- phone field -->
        <div class="form-item">
          <span class="icon"></span>
          <input
            v-model="phone"
            :class="phone !== '' ? 'filled' : ''"
            type="tel"
            required
          />
          <label for="phone">Phone Number</label>
        </div>

        <!-- department field -->
        <div class="form-item">
          <span class="icon"></span>
          <select name="department" id="department" v-model="departmentId">
            <option value="" disabled selected>--please select a department--</option>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.department }}
            </option>
          </select>
        </div>

        <!-- password field -->
        <div class="form-item">
          <span class="icon"></span>
          <input
            v-model="password"
            :class="password !== '' ? 'filled' : ''"
            type="password"
            required
          />
          <label>Password</label>
        </div>

        <button class="submit-button">Register</button>
      </form>
      <div class="other-links">
        <a href="">forget password</a>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
