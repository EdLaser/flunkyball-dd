<template>
  <div>
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold">Spieler Details</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <PlayerInfoCard
        v-if="playerDetails"
        :player="playerDetails"
        :games-played="playerDetails?.gamesPlayed ?? 0"
        :plays-in="playerDetails.team ?? ''"
        :wins="playerDetails?.wins ?? 0"
        @do-refresh="refresh()"
        no-upload
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const nuxtApp = useNuxtApp();

useHead({
  title: `${decodeURIComponent(route.params.id as string)}`,
});

const { data: playerDetails, refresh } = await useFetch(
  () =>
    `/api/players/player-details/${encodeURIComponent(
      route.params.id as string
    )}`, {
      getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
    }
);
</script>
