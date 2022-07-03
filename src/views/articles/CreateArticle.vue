<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useMutation, useQueryClient } from "vue-query";
import Rbuilder from "@/services/Rbuilder";
import { ArticleI, UserI } from "@/types/interfaces";
import { cacheKeys } from "@/utils/cacheKeys";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
const client = useQueryClient();

const props = defineProps({
  article: {
    type: Object as () => ArticleI,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (props.edit && props.article != undefined) {
    label.value = props.article.label;
    title.value = props.article.title;
    article.value = props.article.article;
  }
});

const fullScreenLoading = useFullScreenLoading();
const emit = defineEmits(["close"]);
const flash = useFlashMessage();
const article = ref("");
const label = ref("");
const title = ref("");
const validateFields = () => {
  if (article.value !== "" && title.value !== "" && label.value !== "") return true;
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
interface articleMutationI {
  data: article;
  edit: boolean;
  id: number;
}
interface article {
  article: String;
  label: string;
  title: string;
}
const submit = () => {
  if (validateFields()) {
    mutate({
      data: {
        article: article.value,
        label: label.value,
        title: title.value,
      },
      edit: props.edit,
      id: props.article?.id ?? 0,
    });
  }
};
const { mutate } = useMutation(
  (payload: articleMutationI) => {
    if (payload.edit) {
      return Rbuilder.make("articles").update(payload.id, payload.data);
    } else {
      return Rbuilder.make("articles").create(payload.data);
    }
  },
  {
    onError: (e) => {
      console.log(e);
      flash.showFlash(
        {
          title: "error",
          id: "create_article_error",
          message: "please fill in the required fields",
          type: "error",
        },
        4000
      );
    },
    onMutate: () => {
      fullScreenLoading.startLoading();
    },
    onSettled: () => {
      fullScreenLoading.stopLoading();
    },
    onSuccess: () => {
      client.invalidateQueries(cacheKeys().articles);
      flash.showFlash(
        {
          title: "Operation Succesful",
          id: "create_article_success",
          message: "You operation was succesfull",
          type: "success",
        },
        4000
      );
      emit("close");
    },
  }
);
</script>

<template>
  <div>
    <form action="">
      <div class="form-item">
        <input id="title" type="text" v-model="title" />
        <label for="title">Title</label>
      </div>
      <div class="form-item">
        <input id="label" type="text" v-model="label" />
        <label for="label">label</label>
      </div>
      <div class="form-item">
        <textarea id="article" v-model="article" rows="3"></textarea>
        <label for="article">Article</label>
      </div>

      <div class="actions m-1">
        <button class="blue" @click.prevent="submit">save</button>
        <button class="red" @click.prevent="emit('close')">cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
