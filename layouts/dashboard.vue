<template>
  <div class="flex h-screen bg-background">
    <Button
      @click="sideBarStore.toggleSidebar"
      v-if="!isSidebarOpen"
      variant="ghost"
      v-auto-animate
      size="icon"
      class="absolute bottom-4 md:bottom-6 left-5 md:left-6 z-20 text-primary rounded-full border-primary/50 border-2 supports-backdrop-blur:bg-white/40 backdrop-blur-lg"
    >
      <PanelLeftOpen class="h-4 w-4 md:h-5 md:w-5" />
    </Button>
    <aside
      class="fixed inset-y-0 left-0 z-10 bg-muted p-4 transition-transform duration-200"
      :class="isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'"
    >
      <nav>
        <RouteBreadCrumb class="mt-2 mb-4 md:mb-6 md:mt-4" />
        <div class="space-y-2">
          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && sideBarStore.toggleSidebar()"
          >
            <NuxtLink to="/orga" class="flex items-center">
              <LayoutDashboard class="mr-2 h-4 w-4" />
              Dashboard
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && sideBarStore.toggleSidebar()"
          >
            <NuxtLink to="/orga/tournaments" class="flex items-center">
              <Trophy class="mr-2 h-4 w-4" />
              Turniere
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && sideBarStore.toggleSidebar()"
          >
            <NuxtLink to="/orga/teams" class="flex items-center">
              <Users class="mr-2 h-4 w-4" />
              Teams
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && sideBarStore.toggleSidebar()"
          >
            <NuxtLink to="/orga/locations" class="flex items-center">
              <MapPin class="mr-2 h-4 w-4" />
              Spielorte
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && sideBarStore.toggleSidebar()"
          >
            <NuxtLink to="/orga/settings" class="flex items-center">
              <Settings class="mr-2 h-4 w-4" />
              Einstellungen
            </NuxtLink>
          </Button>
        </div>
      </nav>

      <div class="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
        <div class="div flex justify-end w-full col-span-2">
          <Button
            @click="sideBarStore.toggleSidebar"
            size="icon"
            variant="outline"
            class="p-2"
          >
            <PanelLeftClose class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex justify-between col-span-2">
          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="handleLogout()"
          >
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </Button>
          <ColorModeSwitch />
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <!--  Give some left margin if the sidebar is open on larger screens -->
    <main
      class="flex-1 overflow-y-auto transition-all duration-200"
      :class="isSidebarOpen ? 'md:ml-64' : 'ml-0'"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  Trophy,
  Users,
  MapPin,
  Settings,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate";
import { useSideBarStore } from "~/stores/SideBar";

const sideBarStore = useSideBarStore();

const { isSidebarOpen, isMobile } = storeToRefs(sideBarStore);

const supabase = useSupabaseClient();

const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

async function handleLogout() {
  const result = await logoutUser();
}
</script>
