<template>
  <div class="flex h-screen bg-background">
    <ActionGridButton
      @click="sideBarStore.toggleSidebar"
      size="icon"
      v-if="!isSidebarOpen"
      class="absolute bottom-4 md:bottom-6 left-5 md:left-6 z-20 rounded-full"
    >
      <PanelLeftOpen class="h-4 w-4 md:h-5 md:w-5" />
    </ActionGridButton>
    <aside
      class="fixed inset-y-0 left-0 z-10 bg-muted p-4 transition-transform duration-200 border-r-2"
      :class="isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'"
      ref="sidebarRef"
    >
      <span class="text-muted-foreground"> Hallo, {{ user?.firstName }} </span>
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

      <div class="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2">
        <div class="div flex flex-col items-end w-full gap-2 col-span-4">
          <ActionGridButton :onClick="sideBarStore.toggleSidebar">
            <PanelLeftClose class="h-4 w-4" />
          </ActionGridButton>
          <ColorModeSwitch
            class="text-white bg-gradient-to-br rounded-full from-blue-500 to-pink-500 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          />
        </div>
        <NuxtLink
          v-if="user"
          :to="`/players/${encodeURIComponent(user.publicID)}`"
        >
          <Avatar
            v-if="loggedIn"
            class="text-white bg-gradient-to-br rounded-full from-blue-500 to-pink-500 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <AvatarFallback>
              {{ user?.firstName.slice(0, 2).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
        </NuxtLink>
        <div class="flex flex-col col-span-4 justify-between gap-2">
          <NewStaffMember />
          <ActionGridButton :onClick="handleLogout" size="default">
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </ActionGridButton>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <!--  Give some left margin if the sidebar is open on larger screens -->
    <main
      class="flex-1 overflow-y-auto transition-all duration-200"
      :class="isSidebarOpen ? 'md:ml-64' : 'ml-0'"
      ref="mainRef"
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
import { useSideBarStore } from "~/stores/SideBar";

const sideBarStore = useSideBarStore();

const { isSidebarOpen, isMobile, sidebarRef, mainRef } =
  storeToRefs(sideBarStore);

const { loggedIn, user, clear, fetch } = useUserSession();
watch(loggedIn, async (nowLoggedIn, wasLoggedIn) => {
  if (!wasLoggedIn && nowLoggedIn) {
    await fetch();
  }
});

const logoutUser = async () => {
  try {
    await clear();
  } catch (error) {
    console.error(error);
  }
};

async function handleLogout() {
  await logoutUser();
}
</script>
