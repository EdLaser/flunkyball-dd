<template>
  <div>
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">Team Details</h1>
      </div>
    </header>
    <main class="container px-4 py-8 mx-auto space-y-8">
      <TeamInfoCard
        v-if="team"
        :team="team"
        :games-played="team.totalMatches"
        :wins="team.wins"
      />
      <p class="text-xl font-semibold text-foreground">Spieler</p>
      <div class="grid gap-3 lg:grid-cols-2" v-if="team && team.players">
        <PlayerInfoCard
          v-for="player in team.players"
          :player="player"
          :games-played="player?.gamesPlayed ?? 0"
          :plays-in="player.team ?? ''"
          :wins="player?.wins ?? 0"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const nuxtApp = useNuxtApp();

useHead({
  title: `Team ${decodeURIComponent(route.params.publicID as string)}`,
});

const { data: team } = await useLazyFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`,
  {
    getCachedData(key) {
      // TODO: Fix this to displayed the time when the data was cached
      return getCachedDataOrFetch(key, nuxtApp);
    },
  }
);
</script>
