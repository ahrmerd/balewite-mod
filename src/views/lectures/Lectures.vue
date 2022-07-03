<script setup lang="ts">
import { ref } from "vue";
import { useInfiniteQuery, useQueryClient, useMutation, useQuery } from "vue-query";
import Container from "@/layouts/Container.vue";
import Loading from "@/components/Loading.vue";
import type { LectureI } from "@/types/interfaces";
import Modal from "@/components/Modal.vue";
import Rbuilder from "@/services/Rbuilder";
import { cacheKeys } from "@/utils/cacheKeys";
import Observer from "@/components/Observer.vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import PreviewIcon from "@/components/icons/PreviewIcon.vue";
import { generateMutationOptions } from "@/utils/mutation";
import CreateLecture from "./CreateLecture.vue";

const fullScreenLoading = useFullScreenLoading();
const client = useQueryClient();
const flash = useFlashMessage();
const { courseId } = defineProps({
  courseId: {
    required: true,
    type: Number,
  },
});
const fetchLectures = () => {
  return Rbuilder.make("lectures")
    .orderBy("created_at", "desc")
    .with(["period", "day"])
    .where("course_id", courseId)
    .get();
};

const { isLoading, isError, isSuccess, data } = useQuery(
  cacheKeys(courseId).lectures,
  fetchLectures
);
const { isSuccess: isSuccessDays, data: days } = useQuery(cacheKeys().days, () =>
  Rbuilder.make("days").all()
);
const { isSuccess: isSuccesssPeriods, data: periods } = useQuery(
  cacheKeys().periods,
  () => Rbuilder.make("periods").all()
);
const lectureToEdit = ref({} as LectureI);
const editLecture = (lecture: LectureI) => {
  lectureToEdit.value = lecture;
  openEditModal();
};
const deletelecture = (lecture: LectureI) => {
  mutate(lecture.id);
};
const { mutate } = useMutation(
  (payload: number) => Rbuilder.make("lectures").delete(payload),
  generateMutationOptions("delete", cacheKeys(courseId).lectures[0], () => {})
);
const editModalIsOpen = ref(false);
const createModalIsOpen = ref(false);
const openEditModal = () => {
  closeCreateModal();
  editModalIsOpen.value = true;
};
const closeEditModal = () => {
  editModalIsOpen.value = false;
};

const openCreateModal = () => {
  closeEditModal();
  createModalIsOpen.value = true;
};
const closeCreateModal = () => {
  createModalIsOpen.value = false;
};
</script>

<template>
  <Container>
    <div class="actions" v-if="isSuccessDays && isSuccesssPeriods">
      <button class="btn-blue" @click="openCreateModal">add a lecture</button>
    </div>
    <br />
    <div>
      <div v-if="isError">
        <div>an Error Occured</div>
      </div>
      <div v-else-if="isLoading"><Loading /></div>
      <table v-if="isSuccess && data.data.length !== 0">
        <caption>
          Lectures
        </caption>
        <thead>
          <tr>
            <th>id</th>

            <th>time</th>
            <th>day</th>
            <th>location</th>
            <th>lecturer</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lecture in (data.data as LectureI[])" :key="lecture.id">
            <td data-label="id">{{ lecture.id }}</td>
            <td data-label="time">
              {{ lecture.period.start_time }} - {{ lecture.period.end_time }}
            </td>
            <td data-label="day">{{ lecture.day.day }}</td>
            <td data-label="location">{{ lecture.location }}</td>
            <td data-label="lecturer">{{ lecture.lecturer }}</td>
            <!-- <td data-label="level">{{ lecture }}</td> -->
            <td data-label="actions">
              <EditIcon @click="() => editLecture(lecture)" />
              <DeleteIcon @click="() => deletelecture(lecture)" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>No Lectures found. add a lecture or contact admin</p>
      </div>
    </div>
  </Container>
  <div v-if="isSuccessDays && isSuccesssPeriods">
    <Modal v-if="createModalIsOpen">
      <CreateLecture
        :days="days.data"
        :periods="periods.data"
        :courseId="courseId"
        @close="closeCreateModal"
      ></CreateLecture>
    </Modal>
    <Modal v-if="editModalIsOpen">
      <CreateLecture
        :days="days.data"
        :periods="periods.data"
        :editMode="true"
        :lecture="lectureToEdit"
        :courseId="courseId"
        @close="closeEditModal"
      ></CreateLecture>
    </Modal>
  </div>
</template>

<style scoped lang="scss"></style>
