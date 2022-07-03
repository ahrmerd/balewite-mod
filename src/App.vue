<template class>
  <!-- <nav-menu></nav-menu> -->
  <div class="app">
    <AppHeader />
    <router-view />
    <FlashMessage />
    <FullScreenLoading />

    <VueQueryDevTools />
  </div>
</template>
<script lang="ts" setup>
import { useQueryProvider } from "vue-query";
import { client } from "./init";

import { VueQueryDevTools } from "vue-query/devtools";
import AppHeader from "./components/AppHeader.vue";
import FlashMessage from "./composables/FlashMessage.vue";
import FullScreenLoading from "./composables/FullScreenLoading.vue";
useQueryProvider(client);
</script>
<style lang="scss">
@import "./scss/app.scss";
@import "./scss/forms.scss";
@import "./scss/animations.scss";

body {
  background: #dde1e7;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
