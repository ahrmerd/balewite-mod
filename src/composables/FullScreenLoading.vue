<script lang="ts" setup>
import { useFullScreenLoading } from "./useFullScreenLoading";
const isLoading = useFullScreenLoading().isLoading;
</script>
<template>
  <div class="loading-bg" v-if="isLoading">
    <div class="spinner">
      <div class="stroke"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-bg {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  //   height: 200%;
  margin: auto;
  color: white;
  text-transform: capitalize;
  background-color: rgba($color: #102913, $alpha: 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 100px;
    height: 100px;
    background: #eee;
    position: relative;
    border-radius: 50%;
    display: inline-block;
    &::after,
    &::before {
      content: "";
      width: 100px;
      height: 100px;
      display: block;
      border-radius: 50%;
    }
    &::after {
      position: absolute;
      top: -4px;
      left: -4px;
      border: 4px solid transparent;
      border-top-color: var(--secondary-color);
      border-bottom-color: var(--secondary-color);
      animation: spinny 1s linear infinite;
    }
  }
  .stroke {
    width: 3px;
    height: 60px;
    background-color: var(--secondary-color);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -2px;
    animation: spinny 1s linear infinite;
    transform-origin: top center;
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
