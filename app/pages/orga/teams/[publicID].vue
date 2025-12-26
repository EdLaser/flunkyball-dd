<template>
  <div>
    <header class="bg-primary text-primary-foreground shadow-md">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold">Team Details</h1>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8 space-y-8">
      <TeamInfoCard
        v-if="team"
        :team="team"
        :games-played="team.totalMatches"
        :wins="team.wins"
      />
      <p class="text-xl font-semibold text-foreground">Spieler</p>
      <div class="grid lg:grid-cols-2 gap-3" v-if="team && team.players">
        <PlayerInfoCard
          v-for="player in team.players"
          :player="player"
          :games-played="player?.gamesPlayed ?? 0"
          :plays-in="player.team ?? ''"
          :wins="player?.wins ?? 0"
          no-upload
        />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Team ${decodeURIComponent(route.params.publicID as string)}`,
});

definePageMeta({
  middleware: "auth",
});

const { data: team } = await useLazyFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`
);
</script>
