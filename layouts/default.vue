<template>
  <nav
    class="flex items-center bg-background-secondary md:items-end justify-between space-y-2 h-fit md:h-16 px-3 md:px-8 pt-3 pb-3"
    v-auto-animate
  >
    <RouteBreadCrumb />
    <div class="flex h-full items-center md:flex-row gap-1 md:gap-4 text-xs md:text-base">
      <Button
        v-for="link in user ? loggedInLinks : loggedOutLinks"
        variant="outline"
        class="flex items-center p-2 h-fit w-auto"
        @click="navigateTo(link.to)"
      >
        <component :is="link.icon" class="h-4 w-4" />
        <span class="hidden md:block">{{ link.title }}</span>
      </Button>
      <Button
        v-if="user"
        variant="outline"
        class="flex items-center w-auto"
        @click="handleLogout()"
      >
        <LogOut class="mr-2 h-4 w-4" />
        Logout
      </Button>
      <ColorModeSwitch />
    </div>
  </nav>
  <slot />
</template>

<script lang="ts" setup>
import { LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate";
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
