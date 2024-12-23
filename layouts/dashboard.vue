<template>
  <div class="flex h-screen bg-background">
    <button
      @click="toggleSidebar"
      class="absolute bottom-6 right-6 z-20 md:p-2 p-1 text-primary rounded-full supports-backdrop-blur:bg-white/30 backdrop-blur-lg"
    >
      <Menu class="h-6 w-6" />
    </button>

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
            @click="isMobile && toggleSidebar()"
          >
            <NuxtLink to="/orga" class="flex items-center">
              <LayoutDashboard class="mr-2 h-4 w-4" />
              Dashboard
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && toggleSidebar()"
          >
            <NuxtLink to="/orga/tournaments" class="flex items-center">
              <Trophy class="mr-2 h-4 w-4" />
              Turniere
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && toggleSidebar()"
          >
            <NuxtLink to="/orga/teams" class="flex items-center">
              <Users class="mr-2 h-4 w-4" />
              Teams
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && toggleSidebar()"
          >
            <NuxtLink to="/orga/locations" class="flex items-center">
              <MapPin class="mr-2 h-4 w-4" />
              Spielorte
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="w-full justify-start"
            @click="isMobile && toggleSidebar()"
          >
            <NuxtLink to="/orga/settings" class="flex items-center">
              <Settings class="mr-2 h-4 w-4" />
              Einstellungen
            </NuxtLink>
          </Button>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="absolute bottom-4 left-4 right-4 flex justify-between">
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
import { useMouse } from "@vueuse/core";

import {
  LayoutDashboard,
  Trophy,
  Users,
  MapPin,
  Settings,
  LogOut,
  Menu,
} from "lucide-vue-next";

const supabase = useSupabaseClient();

const { x } = useMouse();

const isMobile = computed(() => window.innerWidth < 768);

watch(x, (value) => {
  if (value < 17) {
    isSidebarOpen.value = true;
  } else {
    isMobile.value && (isSidebarOpen.value = false);
  }
});

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

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
