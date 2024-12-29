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
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: playerDetails } = await useFetch(
  () =>
    `/api/players/player-details/${encodeURIComponent(
      route.params.id as string
    )}`
);
</script>
