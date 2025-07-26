<template>
  <Button
    :variant="props.variant"
    :class="cn(props.class)"
    @click="props.onClick"
  >
    <RefreshCcw class="h-4 w-4" :class="{ 'animate-spin': props.loading, 'text-white': !props.variant }" />
  </Button>
</template>

<script lang="ts" setup>
import { RefreshCcw } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const props = defineProps<{
  onClick: () => void;
  loading: boolean;
  class?: string;
  size?: "icon" | "sm" | "md" | "lg";
  variant?: "secondary" | "outline" | "ghost";
  noText?: boolean;
}>();
</script>
