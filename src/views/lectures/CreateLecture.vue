<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import Rbuilder from "@/services/Rbuilder";
import type { DayI, LectureI, PeriodI } from "@/types/interfaces";
import { useMutation, useQuery } from "vue-query";
import { cacheKeys } from "@/utils/cacheKeys";
import { generateMutationOptions } from "@/utils/mutation";

const { editMode, lecture, courseId } = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: Number,
    required: true,
  },
  lecture: {
    type: Object as () => LectureI,
  },
  days: {
    type: Object as () => DayI[],
    required: true,
  },
  periods: {
    type: Object as () => PeriodI[],
    required: true,
  },
});

const flash = useFlashMessage();
const location = ref("");
const lecturer = ref("");
const dayId = ref(0);
const periodId = ref(0);

onMounted(() => {
  if (editMode && lecture != undefined) {
    location.value = lecture.location;
    lecturer.value = lecture.lecturer;
    periodId.value = lecture.period.id;
    dayId.value = lecture.day.id;
  }
});

const validateFields = () => {
  if (
    location.value !== "" &&
    lecturer.value !== "" &&
    dayId.value !== 0 &&
    periodId.value !== 0
  )
    return true;
  flash.showFlash(
    {
      id: "create_lecture",
      message: "please fill all the fields",
      title: "error",
      type: "error",
    },
    4000
  );
  return false;
};
const emit = defineEmits(["close"]);

interface LectureFormData {
  location: string;
  lecturer: string;
  periodId: number;
  dayId: number;
}

interface lectureMutationI {
  data: LectureFormData;
  edit: boolean;
  id: number;
  courseId: number;
}

const { mutate } = useMutation(
  (payload: lectureMutationI) =>
    payload.edit
      ? Rbuilder.make("lectures").update(payload.id, {
          lecturer: payload.data.lecturer,
          location: payload.data.location,
          day_id: payload.data.dayId,
          period_id: payload.data.periodId,
        })
      : Rbuilder.make("lectures").create({
          lecturer: payload.data.lecturer,
          location: payload.data.location,
          day_id: payload.data.dayId,
          period_id: payload.data.periodId,
          course_id: payload.courseId,
        }),
  generateMutationOptions("create", cacheKeys(courseId).lectures[0], () => emit("close"))
);

const submit = () => {
  if (validateFields()) {
    mutate({
      data: {
        lecturer: lecturer.value,
        location: location.value,
        periodId: periodId.value,
        dayId: dayId.value,
      },
      courseId: courseId,
      edit: editMode,
      id: lecture?.id ?? 0,
    });
  }
};
</script>

<template>
  <div>
    <form action="">
      <div class="form-item">
        <select name="day" id="day" v-model="dayId">
          <option value="0" disabled selected>--please select a day--</option>
          <option v-for="day in days" :key="day.id" :value="day.id">
            {{ day.day }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <select name="d" id="level" v-model="periodId">
          <option value="0" disabled selected>--please select the time--</option>
          <option v-for="period in periods" :key="period.id" :value="period.id">
            {{ period.start_time }} to {{ period.end_time }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <input id="location" type="text" v-model="location" />
        <label for="location">location</label>
      </div>
      <div class="form-item">
        <input id="lecturer" type="text" v-model="lecturer" />
        <label for="lecturer">lecturer</label>
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
