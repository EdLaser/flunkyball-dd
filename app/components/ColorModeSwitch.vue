<script setup lang="ts">
import { SunMedium, Moon } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate";
import { cn } from "@/lib/utils";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <ClientOnly>
    <Button
      @click="toggleColorMode()"
      size="icon"
      :class="cn(props.class)"
      variant="outline"
      v-auto-animate
    >
      <component
        class="w-4 h-4"
        :is="colorMode.value === 'dark' ? SunMedium : Moon"
      />
    </Button>
  </ClientOnly>
</template>
