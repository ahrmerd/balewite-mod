<script lang="ts" setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
</script>
<template>
  <div class="modal">
    <div class="modal-content">
      <slot></slot>
      <div @click="emit('close')" class="modal-overlay"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  display: flex;
  z-index: 10;
  position: fixed;
  // opacity: 0.5;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;

  // background-color: rgba(0, 0, 0, 0.7);
  .modal-overlay {
    z-index: -1;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(145deg, rgba(187, 187, 187, 0.8), rgba(68, 68, 68, 0.8));
  }
  .modal-content {
    margin: auto;
    border-radius: 8px;
    min-height: 10rem;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    width: 70%;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-neumorphic-inset);
    // text-align: center;
  }

  button {
    color: #fff;
    margin: auto;
    &.close {
      background-color: #f00;
    }
  }
}
</style>
