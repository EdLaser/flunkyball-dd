<script setup lang="ts">
import { SunMedium, Moon } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>

<template>
  <ClientOnly>
    <Button
      @click="toggleColorMode()"
      size="icon"
      class="p-2"
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
