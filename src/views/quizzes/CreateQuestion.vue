<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import Rbuilder from "@/services/Rbuilder";
import type { QuestionI } from "@/types/interfaces";
import { useMutation, useQuery } from "vue-query";
import { cacheKeys } from "@/utils/cacheKeys";
import { generateMutationOptions } from "@/utils/mutation";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  quizId: {
    type: Number,
    required: true,
  },
  question: {
    type: Object as () => QuestionI,
  },
});

const flash = useFlashMessage();
const wrongChoices = reactive(Array<string>());
const wrongChoice = ref("");
const question = ref("");
const answer = ref("");
const addWrongChoice = () => {
  if (wrongChoice.value.trim() !== "") {
    wrongChoices.push(wrongChoice.value);
    wrongChoice.value = "";
  }
};
onMounted(() => {
  if (props.editMode && props.question != undefined) {
    question.value = props.question.question;
    props.question.choices.map((ch) => {
      if (ch.is_answer) {
        answer.value = ch.choice;
        return;
      }
      wrongChoices.push(ch.choice);
    });
  }
});

const validateFields = () => {
  if (question.value !== "" && answer.value !== "") return true;
  flash.showFlash(
    {
      id: "create_question",
      message: "please fill all the fields",
      title: "error",
      type: "error",
    },
    4000
  );
  return false;
};
const emit = defineEmits(["close"]);

interface Question {
  question: string;
  quizId: number;
  answer: string;
  incorrect: string[];
}

interface questionMutationI {
  questionId: number;
  data: Question;
  edit: boolean;
}

const { mutate } = useMutation(
  (payload: questionMutationI) =>
    payload.edit
      ? Rbuilder.make("questions").update(payload.questionId, {
          question: payload.data.question,
          answer: payload.data.answer,
          quiz_id: payload.data.quizId,
          incorrect: payload.data.incorrect,
        })
      : Rbuilder.make("questions").create({
          question: payload.data.question,
          answer: payload.data.answer,
          quiz_id: payload.data.quizId,
          incorrect: payload.data.incorrect,
        }),
  generateMutationOptions("create", cacheKeys().quiz[0], () => emit("close"))
);

const submit = async () => {
  if (validateFields()) {
    mutate({
      data: {
        incorrect: wrongChoices,
        question: question.value,
        quizId: props.quizId,
        answer: answer.value,
      },
      questionId: props.question?.id ?? 0,
      edit: props.editMode,
    });
  }
};
</script>

<template>
  <div>
    <div class="">
      <div class="form-item">
        <input id="question" type="text" v-model="question" />
        <label for="question">question</label>
      </div>

      <div class="form-item">
        <input id="answer" type="text" v-model="answer" />
        <label for="answer">answer</label>
      </div>

      <div class="form-item add-choice">
        <input type="text" v-model="wrongChoice" placeholder="" />
        <SaveIcon @click="addWrongChoice" />
        <label>wrong choice</label>
      </div>
      <br />
      <div class="choices-section">
        <h4>Wrong Choices:</h4>
        <ul class="choices">
          <li v-for="(wrongChoice, index) in wrongChoices" :key="index">
            <span>{{ wrongChoice }}</span>
            <span class="action-buttons">
              <EditIcon />
              <DeleteIcon />
            </span>
          </li>
        </ul>
      </div>
      <br />
      <div class="actions mt-1">
        <button class="blue" @click.prevent="submit">save</button>
        <button class="red" @click.prevent="$emit('close')">cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-choice {
  display: flex;
}
.choices {
  //   margin-left: 3rem;
  //   list-style: none;
  text-align: left;
  li {
    position: relative;
    padding: 1rem;
    margin: auto;
    margin-top: 10px;
    width: 80%;
    * {
      margin-right: 0.2rem;
    }
  }
}
</style>
