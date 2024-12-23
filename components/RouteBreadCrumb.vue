<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const route = useRoute();
const router = useRouter();

const paths = computed(() => route.path.split("/").filter((p) => p));

const childRoutes = computed(() =>
  router
    .getRoutes()
    .filter(
      (r) =>
        r.path.startsWith(route.path) &&
        r.path !== route.path &&
        route.meta.middleware?.toString() !== "auth"
    )
    .map((r) => {
      return { path: r.path, name: r.name };
    })
);
console.log("Route:", router.getRoutes());
</script>

<template>
  <Breadcrumb class="flex items-center space-x-2 ml-4 text-xs md:text-base">
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
                {{ childRoute.path.split("/").join(" ") }}
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
          <BreadcrumbPage class="capitalize" v-else>{{ path }}</BreadcrumbPage>
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
                  {{ childRoute.path.split("/").join(" ") }}
                </NuxtLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
