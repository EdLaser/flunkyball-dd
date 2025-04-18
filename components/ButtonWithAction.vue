<template>
  <Button
    @click="props.action"
    class="flex items-center"
    :size="text ? 'sm' : 'icon'"
    :variant="props.variant ?? 'outline'"
    :disabled="props.disabled"
  >
    <component :is="props.icon" class="w-4 h-4 mr-1" />
    {{ props.text }}
  </Button>
</template>

<script lang="ts" setup>
import type { ButtonVariants } from "./ui/button";
const props = defineProps<{
  icon: any;
  text: string;
  action: () => any;
  disabled?: boolean;
  variant?: ButtonVariants["variant"];
}>();
</script>
