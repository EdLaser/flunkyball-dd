<template>
  <div class="bg-background container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Flunkyball Turniere</h1>
    <Card>
      <CardHeader>
        <CardTitle>Flunkyball Turniere</CardTitle>
        <CardDescription> Übersicht über alle Turniere. </CardDescription>
      </CardHeader>
      <CardContent>
        <TournamentList v-if="tournaments" :tournaments="tournaments" />
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Turniere",
});

definePageMeta({
  title: "Turniere",
  name: "Turniere",
});

const nuxtApp = useNuxtApp();

const { data: tournaments } = await useFetch(
  "/api/tournaments/all-tournaments",
  {
    transform: (data) =>
      data.map((tournament) => ({
        ...tournament,
        tournamentDate: new Date(tournament.tournamentDate).toLocaleDateString(
          "de-DE",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      })),
    getCachedData(key) {
      // TODO: Fix this to displayed the time when the data was cached
      return getCachedDataOrFetch(key, nuxtApp);
    },
  }
);
</script>
