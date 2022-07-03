<script lang="ts" setup>
import router from "@/router";
import Rbuilder from "@/services/Rbuilder";
import { cacheKeys } from "@/utils/cacheKeys";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import Tabs from "@/layouts/Tabs.vue";
import Tab from "@/layouts/Tab.vue";
import Quizzes from "@/views/quizzes/Quizzes.vue";
import Lectures from "@/views/lectures/Lectures.vue";

const id = parseInt(useRoute().params.id as string);

const { data, isError, isSuccess } = useQuery({
  queryKey: cacheKeys(id).course,
  queryFn: () => Rbuilder.make("courses").find(id),
});
</script>
<template>
  <div v-if="isSuccess && data.length != 0">
    <Tabs>
      <Tab title="Lectures">
        <Lectures :courseId="id" />
      </Tab>
      <Tab title="Materials">b</Tab>
      <Tab title="Quizzes">
        <Quizzes :courseId="id" />
      </Tab>
    </Tabs>
  </div>
</template>
<style lang="scss" scoped></style>
