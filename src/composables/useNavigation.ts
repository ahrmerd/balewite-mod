import { ref, readonly } from "vue";

const navIsOpen = ref(false);

export function useNavigation() {
  const openNav = () => (navIsOpen.value = true);
  const closeNav = () => (navIsOpen.value = false);
  const toggleNav = () => (navIsOpen.value = !navIsOpen.value);

  return {
    openNav,
    closeNav,
    toggleNav,
    navIsOpen: readonly(navIsOpen),
  };
}
