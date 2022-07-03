<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="`${sizeNum}px`"
    :viewBox="`0 0 ${sizeNum} ${sizeNum}`"
    :width="`${sizeNum}px`"
    :fill="fill"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      :class="size"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
</template>
<script lang>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: {
      default: "small",
      validator(value) {
        // The value must match one of these strings
        return ["small", "medium", "bigger", "big", "biggest"].includes(value);
      },
    },

    fill: {
      default: "green",
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.size} ${this.size}`;
    },

    sizeNum() {
      if (this.size == "small") return "24";
      if (this.size == "medium") return "48";
      if (this.size == "big") return "72";
      if (this.size == "bigger") return "96";
      if (this.size == "biggest") return "120";
      return "24px";
    },
  },
  setup() {
    return {};
  },
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
