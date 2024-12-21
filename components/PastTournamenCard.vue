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
      <p class="text-gray-600"><strong>Datum:</strong> {{ tournament.tournamentDate }}</p>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Trophy } from "lucide-vue-next";

const props = defineProps<{
  tournament: {
    title: string;
    price: string;
    winner: string;
    tournamentDate: string;
  };
}>();
</script>
