<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { RouteRecordNormalized } from "vue-router";

const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();

const routeFilter = (r: RouteRecordNormalized) => {
  const isDynamicRoute = r.path.includes(":");
  if (user.value) {
    return (
      r.path.startsWith(route.path) && r.path !== route.path && !isDynamicRoute
    );
  } else {
    return (
      r.path.startsWith(route.path) &&
      r.path !== route.path &&
      r.meta.middleware !== "auth" &&
      !isDynamicRoute
    );
  }
};

const paths = computed(() => route.path.split("/").filter((p) => p));

const childRoutes = computed(() =>
  router
    .getRoutes()
    .filter(routeFilter)
    .map((r) => {
      return { path: r.path, name: r.name };
    })
);
</script>

<template>
  <Breadcrumb class="flex items-center space-x-2 text-xs md:text-base h-full">
    <BreadcrumbList>
      <BreadcrumbItem>
        <component
          :is="route.path === '/' ? BreadcrumbPage : BreadcrumbLink"
          :href="'/'"
        >
          Home
        </component>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem v-if="childRoutes.length > 0 && paths.length === 0">
        <DropdownMenu>
          <DropdownMenuTrigger class="flex items-center gap-1">
            <BreadcrumbEllipsis class="h-4 w-4" />
            <span class="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              as-child
              v-for="childRoute in childRoutes"
              :key="childRoute.path"
              class="cursor-pointer"
            >
              <NuxtLink :to="childRoute.path" class="capitalize">
                {{ childRoute.path }}
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>

      <template v-for="(path, index) in paths" :key="index">
        <BreadcrumbItem>
          <BreadcrumbLink
            v-if="index !== paths.length - 1"
            :href="`/${
              index === 0 ? path : `${paths.slice(0, index + 1).join('/')}`
            }`"
            class="capitalize"
          >
            {{ path }}
          </BreadcrumbLink>
          <BreadcrumbPage class="capitalize" v-else>{{
            decodeURIComponent(path)
          }}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          v-if="
            index !== paths.length - 1 ||
            (childRoutes.length > 0 && index === paths.length - 1)
          "
        />
        <BreadcrumbItem
          v-if="childRoutes.length > 0 && index === paths.length - 1"
        >
          <DropdownMenu class="text-blue-500">
            <DropdownMenuTrigger class="flex items-center gap-1">
              <BreadcrumbEllipsis class="h-4 w-4" />
              <span class="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                as-child
                v-for="childRoute in childRoutes"
                :key="childRoute.path"
                class="cursor-pointer"
              >
                <NuxtLink :to="childRoute.path" class="capitalize">
                  {{ childRoute.path }}
                </NuxtLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
