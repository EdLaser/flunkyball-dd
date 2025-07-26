<template>
  <nav
    class="flex items-center justify-between px-3 pt-3 pb-3 space-y-2 bg-background-secondary md:items-end h-fit md:h-16 md:px-8"
    v-auto-animate
  >
    <ClientOnly>
      <RouteBreadCrumb />
      <div
        class="flex items-center h-full gap-1 text-xs md:flex-row md:gap-3 md:text-base"
      >
        <ColorModeSwitch />
        <Button
          v-for="link in loggedIn
            ? session?.isStaff
              ? staffLinks
              : userLinks
            : userLinks.concat(loggedOutLinks)"
          variant="outline"
          :size="link.title && !isMobile ? 'default' : 'icon'"
          class="flex items-center"
          @click="navigateTo(link.to)"
        >
          <component :is="link.icon" class="w-4 h-4" />
          <span v-if="link.title && !isMobile">{{ link.title }}</span>
        </Button>
        <Button
          v-if="loggedIn"
          variant="outline"
          size="icon"
          class="flex items-center"
          @click="handleLogout()"
        >
          <LogOut class="w-4 h-4" />
        </Button>
        <NuxtLink
          v-if="user"
          class="w-auto h-fit"
          :to="`/players/${encodeURIComponent(user.publicID)}`"
        >
          <Avatar
            v-if="loggedIn"
            class="p-2 rounded-full shadow-xs cursor-pointer w-9 h-9 bg-background text-primary hover:bg-accent hover:text-accent-foreground"
          >
            <AvatarFallback>
              {{ user?.firstName.slice(0, 2).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
        </NuxtLink>
      </div>
    </ClientOnly>
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
import { useWindowSize } from "@vueuse/core";

const { loggedIn, session, user, clear, fetch } = useUserSession();

const { width } = useWindowSize();

const isMobile = computed(() => {
  return width.value < 768;
});

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
    title: "Teams",
    icon: Users,
    to: "/teams",
  },
  {
    title: "Turniere",
    icon: Trophy,
    to: "/tournaments",
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
