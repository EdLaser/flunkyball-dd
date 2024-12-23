<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "vue";

const route = useRoute();
const router = useRouter();

const paths = route.path.split("/").filter((p) => p);

const childRoutes = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.path.startsWith(route.path) && r.path !== route.path)
    .map((r) => {
      return { path: r.path, name: r.name };
    })
);

console.log("Child Routes:", childRoutes.value);
</script>

<template>
  <Breadcrumb class="flex items-center space-x-2">
    <BreadcrumbList>
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
