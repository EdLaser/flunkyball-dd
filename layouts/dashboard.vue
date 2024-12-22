<template>
  <div class="flex h-screen bg-background">
    <!-- Toggle Sidebar Button -->
    <button
      @click="toggleSidebar"
      class="absolute bottom-4 right-4 z-20 px-2 py-1 text-black rounded-2xl md:hidden supports-backdrop-blur:bg-white/20 backdrop-blur-md"
    >
      <Menu />
    </button>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-10 bg-muted p-4 transition-transform duration-200"
      :class="isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'"
    >
      <nav class="space-y-2">
        <Button variant="ghost" class="w-full justify-start">
          <NuxtLink to="/orga" class="flex items-center">
            <LayoutDashboard class="mr-2 h-4 w-4" />
            Dashboard
          </NuxtLink>
        </Button>

        <Button variant="ghost" class="w-full justify-start">
          <NuxtLink to="/orga/tournaments" class="flex items-center">
            <Trophy class="mr-2 h-4 w-4" />
            Tournaments
          </NuxtLink>
        </Button>

        <Button variant="ghost" class="w-full justify-start">
          <NuxtLink to="/orga/teams" class="flex items-center">
            <Users class="mr-2 h-4 w-4" />
            Teams
          </NuxtLink>
        </Button>

        <Button variant="ghost" class="w-full justify-start">
          <NuxtLink to="/orga/locations" class="flex items-center">
            <MapPin class="mr-2 h-4 w-4" />
            Locations
          </NuxtLink>
        </Button>

        <Button variant="ghost" class="w-full justify-start">
          <NuxtLink to="/orga/settings" class="flex items-center">
            <Settings class="mr-2 h-4 w-4" />
            Settings
          </NuxtLink>
        </Button>
      </nav>

      <!-- Logout Button -->
      <div class="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          class="w-full justify-start"
          @click="handleLogout()"
        >
          <LogOut class="mr-2 h-4 w-4" />
          Logout
        </Button>
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
import { ref } from 'vue'
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  Trophy,
  Users,
  MapPin,
  Settings,
  LogOut,
  Menu
} from "lucide-vue-next";

const supabase = useSupabaseClient();
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

