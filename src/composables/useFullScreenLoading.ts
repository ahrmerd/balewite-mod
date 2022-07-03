import { ref, readonly } from "vue";
const isLoading = ref(false);

export function useFullScreenLoading() {
  const startLoading = () => (isLoading.value = true);
  const stopLoading = () => (isLoading.value = false);
  return {
    isLoading: readonly(isLoading),
    startLoading,
    stopLoading,
  };
}
