<template>
  <nav
    class="flex items-center md:items-end justify-between space-y-2 w-full px-2 pt-6 pb-3"
  >
    <RouteBreadCrumb />
    <div class="flex md:flex-row gap-1 md:gap-4 text-xs md:text-base">
      <Button
        v-for="link in user ? loggedInLinks : loggedOutLinks"
        variant="outline"
        class="md:w-full justify-start p-2 h-fit w-fit"
        @click="navigateTo(link.to)"
      >
        <component :is="link.icon" class="md:mr-2 h-4 w-4" />
        <span class="hidden md:block">{{ link.title }}</span>
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
