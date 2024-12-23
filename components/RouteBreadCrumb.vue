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

const paths = route.path.split("/").filter((p) => p);
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
          >
            {{ path }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>{{ path }}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index !== paths.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
