<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "vue-query";
import Container from "@/layouts/Container.vue";
import Loading from "@/components/Loading.vue";
import Card from "@/components/Card.vue";
import Create from "@/views/articles/CreateArticle.vue";
import Modal from "@/components/Modal.vue";
import Rbuilder from "@/services/Rbuilder";
import type { ArticleI, UserI } from "@/types/interfaces";
import { loggedInUser, logout } from "@/utils/auth";
import { cacheKeys } from "@/utils/cacheKeys";
import Observer from "@/components/Observer.vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";

const fullScreenLoading = useFullScreenLoading();
const client = useQueryClient();
const flash = useFlashMessage();
const mine = ref(false);
const user = loggedInUser();
const fetchArticles = ({ pageParam = 1 }) => {
  const q = Rbuilder.make("articles").orderBy("created_at", "desc").page(pageParam);
  return mine.value ? q.where("user_id", user.id).get() : q.get();
};
const {
  fetchNextPage,
  isLoading,
  isError,
  isFetchingNextPage,
  isSuccess,
  data,
  error,
  refetch,
} = useInfiniteQuery([cacheKeys().articles, mine], fetchArticles, {
  getNextPageParam(lastPage, pages) {
    console.log(lastPage);
    return lastPage.meta.current_page == lastPage.meta.last_page
      ? undefined
      : lastPage.meta.current_page + 1;
  },
});
// const { isLoading, isError, isFetching, data, error } = useQuery("articles", () =>
//   Rbuilder.make("articles").all()
// );
const articleToEdit = ref({} as ArticleI);
const editArticle = (article: ArticleI) => {
  articleToEdit.value = article;
  openEditModal();
};
const deleteArticle = (article: ArticleI) => {
  mutate(article.id);
};
const { mutate } = useMutation(
  (payload: number) => Rbuilder.make("articles").delete(payload),
  {
    onError: () =>
      flash.showFlash(
        {
          title: "an error occured",
          id: "delete_article_error",
          message: "something unusuall happened ",
          type: "error",
        },
        4000
      ),
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
          id: "delete_article_success",
          message: "You operation was succesfull",
          type: "success",
        },
        4000
      );
    },
  }
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
  <div>
    <div class="actions">
      <button class="blue" @click="openCreateModal">Create an Article</button>
    </div>
    <div class="actions">
      <button @click="mine = true" :class="[mine ? 'blue' : 'white']">mine</button>
      <button @click="mine = false" :class="[mine ? 'white' : 'blue']">all</button>
    </div>
    <br />
    <hr />
    <br />
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="isSuccess && data">
      <Container>
        <div v-for="(page, index) in data.pages" :key="index">
          <template v-if="page.data.length !== 0">
            <Card
              v-for="(article) in (page.data as ArticleI[])"
              @edit="() => editArticle(article)"
              @delete="() => deleteArticle(article)"
              :key="article.id"
              :title="article.title"
              :label="article.label"
              :date="article.created_at"
              :content="article.article"
              :action="article.user_id == user.id"
            >
            </Card>
          </template>
          <template v-else> <p>Nothing has being added yet</p></template>
        </div>
        <Loading v-if="isFetchingNextPage"></Loading>
        <Observer @intersect="fetchNextPage"> </Observer>
      </Container>
    </div>
    <Modal v-if="createModalIsOpen" @close="closeCreateModal">
      <Create @close="closeCreateModal"></Create>
    </Modal>
    <Modal v-if="editModalIsOpen" @close="closeEditModal">
      <Create :edit="true" :article="articleToEdit" @close="closeEditModal"></Create>
    </Modal>
  </div>
</template>

<style scoped></style>
