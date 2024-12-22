<template>
  <Card class="bg-white">
    <CardHeader>
      <CardTitle class="flex items-center text-primary">
        <Trophy class="mr-2" />
        {{ tournament.title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-gray-600">
        <strong>Gewinner:</strong> {{ tournament.winner }}
      </p>
      <p class="text-gray-600">
        <strong>Preis:</strong> {{ tournament.price }}
      </p>
      <p class="text-gray-600">
        <strong>Datum:</strong> {{ tournament.tournamentDate }}
      </p>
    </CardContent>
    <CardFooter>
      <NuxtLink
        class="flex hover:translate-x-1 duration-200 text-primary"
        :to="`/tournaments/${tournament.title}`"
      >
        <Info class="mr-2" />
        Details
      </NuxtLink>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { Trophy, Info } from "lucide-vue-next";

const props = defineProps<{
  tournament: {
    title: string;
    price: string;
    winner: string;
    tournamentDate: string;
  };
}>();
</script>
