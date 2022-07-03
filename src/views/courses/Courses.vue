<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "vue-query";
import Container from "@/layouts/Container.vue";
import Loading from "@/components/Loading.vue";
import CreateCourse from "@/views/courses/CreateCourse.vue";
import type { LevelI, CourseI } from "@/types/interfaces";
import Modal from "@/components/Modal.vue";
import Rbuilder from "@/services/Rbuilder";
import { cacheKeys } from "@/utils/cacheKeys";
import Observer from "@/components/Observer.vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import PreviewIcon from "@/components/icons/PreviewIcon.vue";
import { loggedInUser } from "@/utils/auth";
import { generateMutationOptions } from "@/utils/mutation";
import { useRouter } from "vue-router";

const fullScreenLoading = useFullScreenLoading();
const client = useQueryClient();
const flash = useFlashMessage();
const router = useRouter();
const fetchCourses = ({ pageParam = 1 }) => {
  const q = Rbuilder.make("courses")
    .orderBy("created_at", "desc")
    .page(pageParam)
    .from("departments", loggedInUser().department_id)
    .with(["level"]);
  if (levelId.value != 0) {
    q.where("level_id", levelId.value);
  }
  return q.get();
};
const levelId = ref(0);
const { data: levels, isSuccess: isLevelsSuccess } = useQuery(cacheKeys().levels, () =>
  Rbuilder.make("levels").all()
);
const {
  fetchNextPage,
  isLoading,
  isError,
  isFetchingNextPage,
  isSuccess,
  data,
  error,
} = useInfiniteQuery([cacheKeys().courses, levelId], fetchCourses, {
  getNextPageParam(lastPage, pages) {
    return lastPage.meta.current_page == lastPage.meta.last_page
      ? undefined
      : lastPage.meta.current_page + 1;
  },
});
const courseToEdit = ref({} as CourseI);
const editCourse = (course: CourseI) => {
  courseToEdit.value = course;
  openEditModal();
};
const deleteCourse = (course: CourseI) => {
  mutate(course.id);
};
const previewCourse = (course: CourseI) => {
  router.push({ name: "Course", params: { id: course.id.toString() } });
};
const { mutate } = useMutation(
  (payload: number) => Rbuilder.make("courses").delete(payload),
  generateMutationOptions("delete", cacheKeys().courses, () => {})
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
    <div class="actions">
      <button class="btn-blue" @click="createModalIsOpen = true">add a course</button>
    </div>
    <div class="actions" v-if="isLevelsSuccess">
      <button
        @click="levelId = level.id"
        v-for="(level, index) in (levels.data as LevelI[])"
        :key="index"
        :class="[levelId == level.id ? 'blue' : 'white']"
      >
        {{ level.level }}
      </button>
      <button @click="levelId = 0" :class="[levelId == 0 ? 'blue' : 'white']">all</button>
    </div>
    <br />
    <div>
      <div v-if="isError">
        <div>an Error Occured</div>
      </div>
      <div v-else-if="isLoading"><Loading /></div>
      <div v-else-if="data && isSuccess">
        <template v-for="(page, index) in data.pages" :key="index">
          <table v-if="page.data.length !== 0">
            <caption>
              Courses
            </caption>
            <thead>
              <tr>
                <th>id</th>
                <th>course code</th>
                <th>course name</th>
                <th>level</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              <template> </template>
              <tr v-for="course in (page.data as CourseI[])" :key="course.id">
                <td data-label="id">{{ course.id }}</td>
                <td data-label="course code">{{ course.code }}</td>
                <td data-label="course name">{{ course.name }}</td>
                <td data-label="level">{{ course.level?.level }}</td>
                <td data-label="actions">
                  <EditIcon @click="() => editCourse(course)" />
                  <DeleteIcon @click="() => deleteCourse(course)" />
                  <PreviewIcon @click="() => previewCourse(course)" />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p>No Courses found. add a course or contact admin</p>
          </div>
        </template>
      </div>
    </div>
    <Observer @intersect="fetchNextPage"></Observer>
  </Container>
  <Modal v-if="createModalIsOpen">
    <CreateCourse :levels="levels.data" @close="closeCreateModal"></CreateCourse>
  </Modal>
  <Modal v-if="editModalIsOpen">
    <CreateCourse
      :editMode="true"
      :course="courseToEdit"
      :levels="levels.data"
      @close="closeEditModal"
    ></CreateCourse>
  </Modal>
</template>

<style scoped lang="scss"></style>
