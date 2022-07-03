<script lang="ts" setup>
// import { ref, inject } from "vue";

// const selectedTabTitle = inject("selectedTabTitle");
// console.log(selectedTabTitle);

const { title } = defineProps({
  title: {
    type: String,
    default: "Tab",
  },
});
</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>
