<script setup lang="ts">
import EditIcon from "./icons/EditIcon.vue";
import DeleteIcon from "./icons/DeleteIcon.vue";
import moment from "moment";
const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    // required: true,
  },
  subtitle: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: false,
  },
  content: {
    type: String,
    required: true,
  },
  action: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="card">
    <div class="heading">
      <p class="title">{{ props.title }}</p>
      <p class="date sub">{{ moment(props.date).format(" h:mm a, Do MMM, YYYY") }}</p>
    </div>
    <p class="sub">{{ props.subtitle }}</p>
    <p class="content">{{ props.content }}</p>
    <div class="footer">
      <p class="label sub">{{ props.label }}</p>
      <div class="actions" v-if="props.action">
        <button @click="emit('edit')" class="btn">
          <EditIcon></EditIcon>
        </button>
        <button @click="emit('delete')" class="btn">
          <DeleteIcon></DeleteIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  text-align: start;

  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: var(--box-neumorphic);
  .heading {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
  }

  .sub {
    font-weight: 200;
    font-size: 0.8rem;
  }
  .title {
    font-weight: 700;
    font-size: 1.2rem;
  }

  .footer {
    display: flex;
    align-items: end;
    justify-content: space-between;
    // align-content: flex-end;
    margin-top: 0.4rem;
    .btn {
      padding: 0.2rem;
      * {
        transform: scale(0.9);
      }
    }
  }
  .content {
    border-radius: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0.7rem;
    box-shadow: var(--box-neumorphic);
  }
}
</style>
