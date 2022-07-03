<script lang="ts" setup>
import { useNavigation } from "@/composables/useNavigation";
import MenuOpen from "vue-material-design-icons/Menu.vue";
import MenuClose from "vue-material-design-icons/MenuOpen.vue";
import NavMenu from "@/components/NavMenu.vue";
import { onMounted, ref } from "vue";

const isTop = ref(true);

const nav = useNavigation();
</script>

<template>
  <div>
    <header>
      <router-link :to="{ name: 'Home' }" class="logo">
        <!-- <img src="@/assets/logo.png" alt="" srcset="" /> -->
        Balewites
      </router-link>
      <transition name="slide">
        <NavMenu class="nav-menu" v-if="nav.navIsOpen.value"></NavMenu>
      </transition>

      <MenuOpen v-if="!nav.navIsOpen.value" @click="nav.openNav" />
      <MenuClose v-else @click="nav.closeNav" />
    </header>
    <div v-if="nav.navIsOpen.value" @click="nav.closeNav" class="nav-overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
.nav-overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: rgba($color: #000000, $alpha: 0.5);
}

header {
  position: fixed;
  height: 4rem;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 2;
  background-color: rgb(173, 173, 173);

  .logo {
    color: #000000;
    font-weight: 700;
    font-size: large;
  }

  .material-design-icon {
    transform: scale(1.5);
  }
}
</style>
