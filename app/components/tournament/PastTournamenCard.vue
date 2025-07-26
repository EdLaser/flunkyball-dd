<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center text-primary">
        <Trophy class="mr-2" />
        {{ tournament.title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground">
        <strong>Gewinner:</strong> {{ tournament.winner }}
      </p>
      <p class="text-muted-foreground">
        <strong>Preis:</strong> {{ tournament.price }}
      </p>
      <p class="text-muted-foreground">
        <strong>Datum:</strong> {{ tournament.tournamentDate }}
      </p>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
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
