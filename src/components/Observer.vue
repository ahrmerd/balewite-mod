<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
const emit = defineEmits(["intersect"]);
const observer = new IntersectionObserver(([entry]) => {
  if (entry && entry.isIntersecting) {
    emit("intersect");
  }
});
const observerEl = ref<Element | null>(null);

onMounted(() => {
  observer.observe(observerEl.value as Element);
});
onUnmounted(() => {
  observer.disconnect();
});
</script>
<template>
  <div ref="observerEl">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>
