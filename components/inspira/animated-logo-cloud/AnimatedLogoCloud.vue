<template>
  <div class="w-full py-12">
    <div class="mx-auto w-full">
      <div
        v-if="props.title"
        class="text-center font-medium text-muted-foreground"
      >
        {{ props.title }}
      </div>
      <div
        :class="
          cn(
            'group relative mt-6 flex gap-6 overflow-hidden p-2',
            props.class
          )
        "
      >
        <div
          v-for="index in Array(5).fill(null)"
          :key="index"
          class="animate-logo-cloud flex shrink-0 flex-row justify-around w-fit"
        >
          <NuxtImg
            v-for="(logo, key) in props.logos"
            :key="key"
            :src="logo.path"
            :alt="logo.name"
            class="md:w-full md:h-full px-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { AnimateLogoCloudProps } from "./index";

const props = defineProps<AnimateLogoCloudProps>();
</script>

<style scoped>
.mask-animation {
  mask-image: linear-gradient(
    to left,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 95%
  );
}

.animate-logo-cloud {
  animation: logo-cloud 50s linear infinite;
}

@keyframes logo-cloud {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 4rem));
  }
}
</style>
