<template>
  <p class="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">Impressionen</p>
  <Marquee :pause-on-hover="true">
    <NuxtImg
      class="w-fit h-fit"
      :src="picture.path"
      :alt="picture.name"
      v-for="picture in pictures"
    />
  </Marquee>
</template>

<script lang="ts" setup>
import Marquee from "./inspira/Marquee.vue";
const pictures = [
  {
    name: "Catching",
    path: "/img/catching.jpeg",
  },
  {
    name: "Chatter",
    path: "/img/chatter.jpeg",
  },
  {
    name: "Double Drink",
    path: "/img/double-drink.jpeg",
  },
  {
    name: "Military Throw",
    path: "/img/military-throw.jpeg",
  },
  {
    name: "Playing Field",
    path: "/img/playing-field.jpeg",
  },
  {
    name: "Start Throw",
    path: "/img/start-throw.jpeg",
  },
  {
    name: "Yellow Throw",
    path: "/img/yellow-throw.jpeg",
  },
];
</script>
