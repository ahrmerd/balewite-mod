<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import Rbuilder from "@/services/Rbuilder";
import type { QuizI } from "@/types/interfaces";
import { useMutation, useQuery } from "vue-query";
import { cacheKeys } from "@/utils/cacheKeys";
import { generateMutationOptions } from "@/utils/mutation";

const { editMode, quiz, courseId } = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: Number,
    required: true,
  },
  quiz: {
    type: Object as () => QuizI,
    default: 0,
  },
});

const flash = useFlashMessage();
const title = ref("");
const year = ref("");

onMounted(() => {
  if (editMode && quiz != undefined) {
    title.value = quiz.title;
    year.value = quiz.year;
  }
});

const validateFields = () => {
  if (year.value !== "" && title.value !== "") return true;
  flash.showFlash(
    {
      id: "create_quiz",
      message: "please fill all the fields",
      title: "error",
      type: "error",
    },
    4000
  );
  return false;
};
const emit = defineEmits(["close"]);

interface Quiz {
  year: string;
  title: string;
}

interface quizMutationI {
  data: Quiz;
  edit: boolean;
  id: number;
  courseId: number;
}

const { mutate } = useMutation(
  (payload: quizMutationI) =>
    payload.edit
      ? Rbuilder.make("quizzes").update(payload.id, {
          year: payload.data.year,
          title: payload.data.title,
        })
      : Rbuilder.make("quizzes").create({
          year: payload.data.year,
          title: payload.data.title,
          course_id: payload.courseId,
        }),
  generateMutationOptions("create", cacheKeys(courseId).quizzes[0], () => emit("close"))
);

const submit = () => {
  if (validateFields()) {
    mutate({
      data: {
        year: year.value,
        title: title.value,
      },
      courseId: courseId,
      edit: editMode,
      id: quiz.id,
    });
  }
};
</script>

<template>
  <div>
    <form action="">
      <div class="form-item">
        <input id="title" type="text" v-model="title" />
        <label for="title">quiz title</label>
      </div>
      <div class="form-item">
        <input id="year" type="text" v-model="year" />
        <label for="year">quiz year</label>
      </div>
      >
      <div class="actions mt-1">
        <button class="blue" @click.prevent="submit">save</button>
        <button class="red" @click.prevent="$emit('close')">cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
