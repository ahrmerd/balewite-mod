<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "vue-query";
import Container from "@/layouts/Container.vue";
import Loading from "@/components/Loading.vue";
import Card from "@/components/Card.vue";
import Create from "@/views/announcements/CreateAnnouncement.vue";
import Modal from "@/components/Modal.vue";
import Rbuilder from "@/services/Rbuilder";
import type { AnnouncementI, UserI } from "@/types/interfaces";
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
const fetchAnnouncements = ({ pageParam = 1 }) => {
  const q = Rbuilder.make("announcements").orderBy("created_at", "desc").page(pageParam);
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
} = useInfiniteQuery([cacheKeys().announcements, mine], fetchAnnouncements, {
  getNextPageParam(lastPage, pages) {
    return lastPage.meta.current_page == lastPage.meta.last_page
      ? undefined
      : lastPage.meta.current_page + 1;
  },
});
const announcementToEdit = ref({} as AnnouncementI);
const editAnnouncement = (announcement: AnnouncementI) => {
  announcementToEdit.value = announcement;
  openEditModal();
};
const deleteAnnouncement = (announcement: AnnouncementI) => {
  mutate(announcement.id);
};
const { mutate } = useMutation(
  (payload: number) => Rbuilder.make("announcements").delete(payload),
  {
    onError: () =>
      flash.showFlash(
        {
          title: "an error occured",
          id: "delete_announcement_error",
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
      client.invalidateQueries(cacheKeys().announcements);
      flash.showFlash(
        {
          title: "Operation Succesful",
          id: "delete_announcement_success",
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
      <button class="blue" @click="openCreateModal">Create an Announcement</button>
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
          <template v-if="page.data.length != 0">
            <Card
              v-for="(announcement) in (page.data as AnnouncementI[])"
              @edit="() => editAnnouncement(announcement)"
              @delete="() => deleteAnnouncement(announcement)"
              :key="announcement.id"
              :title="announcement.title"
              :label="announcement.label"
              :date="announcement.created_at"
              :content="announcement.announcement"
              :action="announcement.user_id == user.id"
            >
            </Card>
          </template>
          <template v-else>
            <div>
              <p>Nothing has been added yet</p>
            </div>
          </template>
        </div>
        <Loading v-if="isFetchingNextPage"></Loading>
        <Observer @intersect="fetchNextPage"> </Observer>
      </Container>
    </div>
    <div v-else="">
      <p>something Happened</p>
    </div>

    <Modal v-if="createModalIsOpen" @close="closeCreateModal">
      <Create @close="closeCreateModal"></Create>
    </Modal>
    <Modal v-if="editModalIsOpen" @close="closeEditModal">
      <Create
        :edit="true"
        :announcement="announcementToEdit"
        @close="closeEditModal"
      ></Create>
    </Modal>
  </div>
</template>

<style scoped></style>
