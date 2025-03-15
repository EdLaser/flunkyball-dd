<template>
  <nav
    class="flex items-center bg-background-secondary md:items-end justify-between space-y-2 h-fit md:h-16 px-3 md:px-8 pt-3 pb-3"
    v-auto-animate
  >
    <RouteBreadCrumb />
    <div
      class="flex h-full items-center md:flex-row gap-1 md:gap-3 text-xs md:text-base"
    >
      <ColorModeSwitch />
      <Button
        v-for="link in loggedIn
          ? session.isStaff
            ? staffLinks
            : userLinks
          : userLinks.concat(loggedOutLinks)"
        variant="outline"
        :size="link.title ? 'default' : 'icon'"
        class="flex items-center"
        @click="navigateTo(link.to)"
      >
        <component :is="link.icon" class="h-4 w-4" />
        <span v-if="link.title" class="hidden md:block">{{ link.title }}</span>
      </Button>
      <Button
        v-if="loggedIn"
        variant="outline"
        class="flex items-center"
        @click="handleLogout()"
      >
        <LogOut class="md:mr-2 h-4 w-4" />
        <span class="hidden md:block">Logout</span>
      </Button>
      <NuxtLink
        v-if="user"
        class="h-fit w-auto"
        :to="`/players/${encodeURIComponent(user.publicID)}`"
      >
        <Avatar
          v-if="loggedIn"
          class="bg-background p-2 rounded-md text-primary shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <AvatarFallback>
            {{ user?.firstName.slice(0, 2).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
      </NuxtLink>
    </div>
  </nav>
  <slot />
</template>

<script lang="ts" setup>
import {
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Beer,
  Trophy,
  Users,
} from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate";

const { loggedIn, session, user, clear, fetch } = useUserSession();

watch(loggedIn, async (nowLoggedIn, wasLoggedIn) => {
  if (!wasLoggedIn && nowLoggedIn) {
    await fetch();
  }
});

const handleLogout = async () => {
  await clear();
};

const staffLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/orga",
  },
];

const userLinks = [
  {
    title: "Spieler",
    icon: Beer,
    to: "/players",
  },
  {
    title: "Turniere",
    icon: Trophy,
    to: "/tournaments",
  },
  {
    title: "Teams",
    icon: Users,
    to: "/teams",
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
