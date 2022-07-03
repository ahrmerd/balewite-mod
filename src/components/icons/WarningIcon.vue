<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="`${sizeNum}px`"
    :viewBox="`0 0 ${sizeNum} ${sizeNum}`"
    :width="`${sizeNum}px`"
    :fill="fill"
  >
    <path :class="size" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  size: {
    default: "small",
    validator(value) {
      // The value must match one of these strings
      return ["small", "medium", "bigger", "big", "biggest"].includes(value as string);
    },
  },

  fill: {
    default: "yellow",
  },
});

const viewBox = computed(() => `0 0 ${props.size} ${props.size}`);

const sizeNum = computed(() => {
  if (props.size == "small") return "24";
  if (props.size == "medium") return "48";
  if (props.size == "big") return "72";
  if (props.size == "bigger") return "96";
  if (props.size == "biggest") return "120";
  return "24px";
});
</script>

<style scoped scss>
.small {
  transform: scale(1);
}
.medium {
  transform: scale(2);
}
.big {
  transform: scale(3);
}
.bigger {
  transform: scale(4);
}
.biggest {
  transform: scale(5);
}
</style>
