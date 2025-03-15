import { defineStore } from "pinia";
import { useMouse, useStorage } from "@vueuse/core";

export const useSideBarStore = defineStore("SideBarStore", () => {
  const { x } = useMouse();

  const isMobile = computed(() => window.innerWidth < 768);
  const sidebarRef = ref<HTMLElement | null>(null);
  const mainRef = ref<HTMLElement | null>(null);

  watch(x, (value) => {
    if (value < 17) {
      isSidebarOpen.value = true;
    } else if (sidebarRef.value && value > sidebarRef.value.offsetWidth) {
      isMobile.value && (isSidebarOpen.value = false);
    }
  });

  const isSidebarOpen = useStorage("isSidebarOpen", false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  return {
    isSidebarOpen,
    isMobile,
    sidebarRef,
    mainRef,
    toggleSidebar,
  };
});
