<script setup lang="ts">
import { ref } from "vue";
import { useInfiniteQuery, useQueryClient, useMutation } from "vue-query";
import Container from "@/layouts/Container.vue";
import Loading from "@/components/Loading.vue";
import type { QuizI } from "@/types/interfaces";
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
import CreateQuiz from "./CreateQuiz.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fullScreenLoading = useFullScreenLoading();
const client = useQueryClient();
const flash = useFlashMessage();
const { courseId } = defineProps({
  courseId: {
    required: true,
    type: Number,
  },
});
const fetchQuizzes = ({ pageParam = 1 }) => {
  return Rbuilder.make("quizzes")
    .orderBy("created_at", "desc")
    .page(pageParam)
    .where("course_id", courseId)
    .get();
};

const {
  fetchNextPage,
  isLoading,
  isError,
  isFetchingNextPage,
  isSuccess,
  data,
  error,
} = useInfiniteQuery(cacheKeys(courseId).quizzes, fetchQuizzes, {
  getNextPageParam(lastPage, pages) {
    return lastPage.meta.current_page == lastPage.meta.last_page
      ? undefined
      : lastPage.meta.current_page + 1;
  },
});
const quizToEdit = ref({} as QuizI);
const editCourse = (quiz: QuizI) => {
  quizToEdit.value = quiz;
  openEditModal();
};
const deleteQuiz = (quiz: QuizI) => {
  mutate(quiz.id);
};
const previewQuiz = (quiz: QuizI) => {
  router.push({ name: "Quiz", params: { id: quiz.id.toString() } });
};
const { mutate } = useMutation(
  (payload: number) => Rbuilder.make("quizzes").delete(payload),
  generateMutationOptions("delete", cacheKeys(courseId).quizzes[0], () => {})
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
      <button class="btn-blue" @click="createModalIsOpen = true">add a quiz</button>
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
              Quizzes
            </caption>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>year</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              <template> </template>
              <tr v-for="quiz in (page.data as QuizI[])" :key="quiz.id">
                <td data-label="id">{{ quiz.id }}</td>
                <td data-label="quiz code">{{ quiz.title }}</td>
                <td data-label="quiz name">{{ quiz.year }}</td>
                <!-- <td data-label="level">{{ quiz }}</td> -->
                <td data-label="actions">
                  <EditIcon @click="() => editCourse(quiz)" />
                  <DeleteIcon @click="() => deleteQuiz(quiz)" />
                  <PreviewIcon @click="() => previewQuiz(quiz)" />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p>No Quizzes found. add a quiz or contact admin</p>
          </div>
        </template>
      </div>
    </div>
    <Observer @intersect="fetchNextPage"></Observer>
  </Container>
  <Modal v-if="createModalIsOpen">
    <CreateQuiz :course-id="courseId" @close="closeCreateModal"></CreateQuiz>
  </Modal>
  <Modal v-if="editModalIsOpen">
    <CreateQuiz
      :editMode="true"
      :quiz="quizToEdit"
      :course-id="courseId"
      @close="closeEditModal"
    ></CreateQuiz>

    <!-- <Create
      :editMode="true"
      :quiz="quizToEdit"
      :levels="levels.data"
      @close="closeEditModal"
    ></Create> -->
  </Modal>
</template>

<style scoped lang="scss"></style>
