<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.container {
  background-color: rgba($color: white, $alpha: 0.5);
  min-height: 80vh;
  overflow: hidden;
  max-width: 90%;
  margin: auto;
  border-radius: 10px;
  padding: 0.5rem;
  @media screen and (min-width: 600px) {
    // background-color: red;
    max-width: 70%;
  }
}
</style>