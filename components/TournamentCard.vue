<template>
  <Card class="bg-white">
    <CardHeader>
      <CardTitle class="flex items-center text-amber-600">
        <Calendar class="mr-2" />
        {{ tournament.title }}
      </CardTitle>
      <CardDescription>{{ tournament.description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-lg mb-2 text-gray-600">
        <strong>Datum:</strong>
        {{ tournament.tournamentDate }}
      </p>
      <p class="text-lg mb-2 text-gray-600">
        <strong>Ort:</strong> {{ tournament.location }}
      </p>
      <p class="text-lg mb-4 text-gray-600">
        <strong>Preis:</strong> {{ tournament.price }}
      </p>
      <Button class="bg-amber-600 hover:bg-amber-700 text-white"
        >Learn More</Button
      >
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Calendar } from "lucide-vue-next";
const props = defineProps<{
  tournament: {
    title: string;
    price: string;
    tournamentDate: string;
    location: string;
    description: string | null;
  };
}>();
</script>
