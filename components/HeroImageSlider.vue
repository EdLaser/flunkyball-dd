<template>
  <div>
    <AnimatedLogoCloud :logos title="Impressionen" />
  </div>
</template>

<script lang="ts" setup>
import { AnimatedLogoCloud } from "@/components/inspira/animated-logo-cloud";
const logos = [
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
