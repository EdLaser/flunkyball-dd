<template>
  <div class="flex h-screen bg-background">
    <aside class="w-64 bg-muted p-4 relative">
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

    <!-- Main content slot -->
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

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

const handleLogout = async () => {
  const result = await logoutUser();
};

import {
  LayoutDashboard,
  Trophy,
  Users,
  MapPin,
  Settings,
  LogOut,
} from "lucide-vue-next";
</script>
