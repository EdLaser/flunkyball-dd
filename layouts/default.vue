<template>
  <nav class="flex flex-col items-end space-y-2 w-full px-2 pt-6 pb-3">
    <div class="flex gap-4">
      <Button
        v-for="link in user ? loggedInLinks : loggedOutLinks"
        variant="outline"
        class="w-full justify-start"
        @click="navigateTo(link.to)"
      >
        <component :is="link.icon" class="mr-2 h-4 w-4" />
        {{ link.title }}
      </Button>
      <Button
        v-if="user"
        variant="outline"
        class="w-full justify-start"
        @click="handleLogout()"
      >
        <LogOut class="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  </nav>
  <slot />
</template>

<script lang="ts" setup>
import { LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-vue-next";
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleLogout = async () => {
  await supabase.auth.signOut();
};

const loggedInLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/orga",
  },
];

const loggedOutLinks = [
  {
    title: "Anmelden",
    icon: LogIn,
    to: "/login",
  },
  {
    title: "Registrieren",
    icon: UserPlus,
    to: "/register",
  },
];
</script>
