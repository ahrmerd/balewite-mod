<script lang="ts" setup>
import Warning from "./icons/WarningIcon.vue";
</script>
<template>
  <div class="loading-bg">
    <Warning class="spinner" size="biggest" fill="red"></Warning>
    <div class=""></div>
    <button class="btn red">an Error has occured</button>
  </div>
</template>

<style scoped lang="scss">
.loading-bg {
  width: 100%;
  height: 200px;
  margin: auto;
  text-transform: capitalize;
  position: relative;

  .spinner {
    animation: spinny 1s linear infinite;
  }
}

@keyframes spinny {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(90deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
