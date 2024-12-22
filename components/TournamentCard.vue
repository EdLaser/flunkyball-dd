<template>
  <Card class="bg-white">
    <CardHeader>
      <CardTitle class="flex items-center text-primary">
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
    </CardContent>
    <CardFooter>
      <Button
        class="flex hover:translate-x-1 duration-200 transition-all"
        @click="navigateTo(`/tournaments/${tournament.title}`)"
      >
        <Info class="mr-2" />
        Details
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { Calendar, Info } from "lucide-vue-next";
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
