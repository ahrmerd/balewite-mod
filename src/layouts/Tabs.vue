<script lang="ts" setup>
import { ref, RendererElement, RendererNode, useSlots, VNode } from "vue";
const slots = useSlots();
const tabTitles = Array<string>();
const tabs = Array<VNode<RendererNode, RendererElement>>();
// const tabs = ref((<unknown>[]));
if (slots.default) {
  slots.default().forEach((item) => {
    tabTitles.push(item.props?.title);
    tabs.push(item);
  });
  //   tabTitles.value = slots.default().map((item) => item.props?.title) as any;
}

const selectedTabTitle = ref(tabTitles[0] ?? "");
const selectTab = (tabTitle: string) => {
  selectedTabTitle.value = tabTitle;
};
</script>
<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li
        v-for="(tabTitle, index) in tabTitles"
        class="tab-title"
        :class="{ 'selected-title': tabTitle == selectedTabTitle }"
        :key="index"
        @click="() => selectTab(tabTitle)"
      >
        {{ tabTitle }}
      </li>
    </ul>
    <div class="tab-view">
      <template v-for="(item, index) in tabs" :key="index">
        <component :is="item" v-show="item.props?.title == selectedTabTitle"></component>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tab-view {
  margin-top: 1rem;
}
.tabs-header {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  .tab-title {
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;
    border: 1px solid rgba($color: #000000, $alpha: 0.5);
    // box-shadow: var(--box-neumorphic-inset);
    background-color: gray;
    color: white;
  }
  .selected-title {
    background-color: white;
    color: black;
  }
}
</style>
