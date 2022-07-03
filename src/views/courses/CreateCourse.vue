<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import Rbuilder from "@/services/Rbuilder";
import type { CourseI, LevelI } from "@/types/interfaces";
import { useMutation, useQuery } from "vue-query";
import { cacheKeys } from "@/utils/cacheKeys";
import { loggedInUser } from "@/utils/auth";
import { generateMutationOptions } from "@/utils/mutation";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
const { levels, editMode, course } = defineProps({
  levels: {
    type: Object as () => LevelI[],
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object as () => CourseI,
    default: 0,
  },
});

const user = loggedInUser();
const department_id = user.department_id;
const flash = useFlashMessage();
const levelId = ref(0);
const name = ref("");
const code = ref("");

onMounted(() => {
  if (editMode && course != undefined) {
    levelId.value = course.level.id;
    name.value = course.name;
    code.value = course.code;
  }
});

const validateFields = () => {
  if (code.value !== "" && name.value !== "" && levelId.value !== 0) return true;
  flash.showFlash(
    {
      id: "create_course",
      message: "please fill all the fields",
      title: "error",
      type: "error",
    },
    4000
  );
  return false;
};
const emit = defineEmits(["close"]);

interface Course {
  level_id: number;
  department_id: number;
  code: string;
  name: string;
}

interface courseMutationI {
  data: Course;
  edit: boolean;
  id: number;
}

const { mutate } = useMutation(
  (payload: courseMutationI) =>
    payload.edit
      ? Rbuilder.make("courses").update(payload.id, {
          level_id: payload.data.level_id,
          code: payload.data.code,
          name: payload.data.name,
          department_id: payload.data.department_id,
        })
      : Rbuilder.make("courses").create({
          level_id: payload.data.level_id,
          code: payload.data.code,
          name: payload.data.name,
          department_id: payload.data.department_id,
        }),
  generateMutationOptions("create", cacheKeys().courses, () => emit("close"))
);

const submit = () => {
  if (validateFields()) {
    mutate({
      data: {
        level_id: levelId.value,
        code: code.value,
        name: name.value,
        department_id: department_id,
      },
      edit: editMode,
      id: course?.id,
    });
  }
};
</script>

<template>
  <div>
    <form action="">
      <div class="form-item">
        <input
          id="code"
          type="text"
          placeholder="what is the course code eg MTH111"
          v-model="code"
        />
        <label for="code">course code</label>
      </div>
      <div class="form-item">
        <input id="name" type="text" v-model="name" />
        <label for="name">course name</label>
      </div>
      <div class="form-item">
        <select name="level" id="level" v-model="levelId">
          <option value="" disabled selected>--please select a level--</option>
          <option v-for="level in levels" :key="level.id" :value="level.id">
            {{ level.level }}
          </option>
        </select>
      </div>
      <div class="actions mt-1">
        <button class="blue" @click.prevent="submit">save</button>
        <button class="red" @click.prevent="$emit('close')">cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
