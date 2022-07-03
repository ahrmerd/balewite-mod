<script lang="ts" setup>
import { useQuery } from "vue-query";
import { cacheKeys } from "@/utils/cacheKeys";
import { useRoute } from "vue-router";
import Rbuilder from "@/services/Rbuilder";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import Container from "@/layouts/Container.vue";
import type { QuizResourceI } from "@/types/interfaces";
import moment from "moment";
import Modal from "@/components/Modal.vue";
import CreateQuestion from "./CreateQuestion.vue";
import { ref } from "vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
const id = parseInt(useRoute().params.id as string);
const CreateQuestionModalIsOpen = ref(false);
const closeCreateModal = () => (CreateQuestionModalIsOpen.value = false);
const openCreateModal = () => (CreateQuestionModalIsOpen.value = true);
const { isLoading, isError, isSuccess, data } = useQuery({
  queryKey: cacheKeys(id).quiz,
  queryFn: () => Rbuilder.make("quizzes").find(id),
});
</script>
<template>
  <div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else-if="isError">
      <Error></Error>
    </div>
    <div v-else-if="isSuccess">
      <Container>
        <div v-for="(quiz, index) in (data as QuizResourceI[])" :key="index">
          <div class="quiz-info">
            <p>Course Code: {{ quiz.course.code }}</p>
            <p>Course Name: {{ quiz.course.name }}</p>
            <p>Quiz Title: {{ quiz.title }}</p>
            <p>Quiz Year: {{ quiz.year }}</p>
            <p>
              Created at : {{ moment(quiz.created_at).format(" h:mm a, Do MMM, YYYY") }}
            </p>
            <div class="actions">
              <button @click="openCreateModal">Add Question</button>
            </div>
            <br />
            <hr />
          </div>
          <div class="questions" v-if="quiz.questions.length != 0">
            <div
              class="question"
              v-for="(question, index) in quiz.questions"
              :key="question.id"
            >
              <p>{{ question.question }}</p>
              <span v-for="(ch, index) in question.choices" :key="ch.id">
                {{ ch.choice }}
                <CheckIcon v-if="ch.is_answer" />
              </span>
            </div>
          </div>
          <div class="no-question" v-else>
            <p>No question Add Question or contact admin</p>
          </div>
        </div>
        <Modal v-if="CreateQuestionModalIsOpen">
          <CreateQuestion
            :quiz-id="id"
            @close="closeCreateModal"
            :edit-mode="false"
          ></CreateQuestion>
        </Modal>
      </Container>
    </div>
    <div v-else>
      <Error></Error>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
