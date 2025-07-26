<template>
  <Button
    :size="props.size ?? 'icon'"
    :class="
      cn(
        'text-white bg-linear-to-br rounded-full from-blue-500 to-pink-500 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-pink-600 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50',
        props.class
      )
    "
    @click="props.onClick()"
  >
    <slot />
  </Button>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";

const props = defineProps<{
  onClick: Function;
  size?: "icon" | "sm" | "lg" | "default";
  class?: string;
}>();
</script>
