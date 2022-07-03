<template>
  <transition-group name="list" class="messages-container" tag="div">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="item"
      :class="[
        message.type == 'error'
          ? 'error'
          : message.type == 'success'
          ? 'success'
          : message.type == 'warning'
          ? 'warning'
          : 'error',
      ]"
    >
      <div class="indicator"></div>
      <div class="icon">
        <component
          size="big"
          :is="
            message.type == 'error'
              ? errorIcon
              : message.type == 'success'
              ? successIcon
              : message.type == 'warning'
              ? warningIcon
              : errorIcon
          "
        ></component>
      </div>
      <div class="text">
        <div class="title">{{ message.title }}</div>
        <div class="message">{{ message.message }}</div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import errorIcon from "@/components/icons/ErrorIcon.vue";
import warningIcon from "@/components/icons/WarningIcon.vue";
import successIcon from "@/components/icons/SuccessIcon.vue";
import { useFlashMessage } from "@/composables/useFlashMessage";

const messages = useFlashMessage().messages;
</script>

<style lang="scss" scoped>
$success: rgb(0, 128, 0);
$error: rgb(255, 0, 0);
$warning: rgb(255, 166, 0);
.messages-container {
  z-index: 10;
  position: fixed;
  display: flex;
  bottom: 10px;
  right: 10px;
  color: white;
  background-color: transparent;
  flex-direction: column;
}
.item {
  width: 280px;
  transition: all 0.6s ease;
  display: flex;
  &.error {
    border: 2px solid $error;
    background-color: rgba($color: $error, $alpha: 0.5);
    .indicator {
      background-color: $error;
    }
  }
  &.success {
    border: 2px solid $success;
    background-color: rgba($color: $success, $alpha: 0.5);
    .indicator {
      background-color: $success;
    }
  }
  &.warning {
    border: 2px solid $warning;
    background-color: rgba($color: $warning, $alpha: 0.6);
    color: black;
    .indicator {
      background-color: $warning;
    }
  }
}
.indicator {
  width: 0.5rem;
}

.text {
  padding: 0.9rem;
}
.title {
  font-weight: bolder;
  text-transform: capitalize;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// .bounce-enter-active {
//   animation: bounce-in 0.5s;
// }
// .bounce-leave-active {
//   animation: bounce-in 0.5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.25);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>
