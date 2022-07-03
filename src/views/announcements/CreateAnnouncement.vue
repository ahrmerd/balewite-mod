<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useMutation, useQueryClient } from "vue-query";
import Rbuilder from "@/services/Rbuilder";
import { AnnouncementI, UserI } from "@/types/interfaces";
import { cacheKeys } from "@/utils/cacheKeys";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
const client = useQueryClient();

const props = defineProps({
  announcement: {
    type: Object as () => AnnouncementI,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (props.edit && props.announcement != undefined) {
    label.value = props.announcement.label;
    title.value = props.announcement.title;
    announcement.value = props.announcement.announcement;
  }
});

const fullScreenLoading = useFullScreenLoading();
const emit = defineEmits(["close"]);
const flash = useFlashMessage();
const announcement = ref("");
const label = ref("");
const title = ref("");
const validateFields = () => {
  if (announcement.value !== "" && title.value !== "" && label.value !== "") return true;
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
interface announcementMutationI {
  data: announcement;
  edit: boolean;
  id: number;
}
interface announcement {
  announcement: string;
  label: string;
  title: string;
}
const submit = () => {
  if (validateFields()) {
    mutate({
      data: {
        announcement: announcement.value,
        label: label.value,
        title: title.value,
      },
      edit: props.edit,
      id: props.announcement?.id ?? 0,
    });
  }
};
const { mutate } = useMutation(
  (payload: announcementMutationI) => {
    if (payload.edit) {
      return Rbuilder.make("announcements").update(payload.id, payload.data);
    } else {
      return Rbuilder.make("announcements").create(payload.data);
    }
  },
  {
    onError: (e) => {
      console.log(e);
      flash.showFlash(
        {
          title: "error",
          id: "create_announcement_error",
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
      client.invalidateQueries(cacheKeys().announcements);
      flash.showFlash(
        {
          title: "Operation Succesful",
          id: "create_announcement_success",
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
        <textarea id="announcement" v-model="announcement" rows="3"></textarea>
        <label for="announcement">Announcement</label>
      </div>

      <div class="actions m-1">
        <button class="blue" @click.prevent="submit">save</button>
        <button class="red" @click.prevent="emit('close')">cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
