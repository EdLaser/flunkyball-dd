<template>
  <div class="bg-background container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Spieler</h1>
    <div class="grid grid-cols-6 mb-6 justify-between gap-3">
      <Input
        class="col-span-3"
        type="text"
        placeholder="Spieler filtern..."
        v-model="query"
      />
    </div>
    <div class="grid md:grid-cols-2 gap-4" v-auto-animate>
      <PlayerInfoCard
        v-for="player in filteredPlayers"
        :player="player"
        :games-played="player?.matchesPlayed ?? 0"
        :plays-in="player.playsIn ?? ''"
        no-upload
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayerInfoCard from "@/components/player/InfoCard.vue";
import { vAutoAnimate } from "@formkit/auto-animate";
const query = ref("");

definePageMeta({
  name: "Spieler",
  title: "Alle Spieler",
});

const { data: players } = await useFetch("/api/players/all-players");

const filteredPlayers = computed(() => {
  if (!players.value) return [];
  if (!query.value) return players.value;
  return players.value.filter((p) => {
    return (
      p.firstName.toLowerCase().includes(query.value.toLowerCase()) ||
      p.lastName?.toLowerCase().includes(query.value.toLowerCase()) ||
      p.publicID?.toLowerCase().includes(query.value.toLowerCase())
    );
  });
});
</script>
