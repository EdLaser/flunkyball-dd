<template>
  <div class="bg-background container mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Spieler</h1>
    <div class="grid grid-cols-12 mb-6 justify-between gap-3">
      <Input
        class="col-span-5 md:col-span-4"
        type="text"
        placeholder="Spieler filtern..."
        v-model="query"
      />
      <Select v-model="orderBy">
        <SelectTrigger class="col-span-4 md:col-span-2">
          <SelectValue placeholder="Sortieren..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="victory"> Siege </SelectItem>
            <SelectItem value="matches"> Spiele </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        size="icon"
        class="col-span-2"
        variant="outline"
        @click="() => (direction = direction === 'asc' ? 'desc' : 'asc')"
        v-auto-animate
        v-if="orderBy"
      >
        <component :is="direction === 'asc' ? ArrowDown10 : ArrowUp10" />
      </Button>
    </div>
    <div class="grid md:grid-cols-2 gap-4" v-auto-animate>
      <PlayerInfoCard
        v-for="player in orderedAndFilteredPlayers"
        :player="player"
        :games-played="player?.matchesPlayed ?? 0"
        :plays-in="player.playsIn ?? ''"
        :wins="player.wins ?? 0"
        no-upload
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayerInfoCard from "@/components/player/InfoCard.vue";
import { vAutoAnimate } from "@formkit/auto-animate";
import { ArrowUp10, ArrowDown10 } from "lucide-vue-next";

const nuxtApp = useNuxtApp();

const query = ref("");
const orderBy = ref<"" | "victory" | "matches">("");
const direction = ref<"asc" | "desc">("asc");

useHead({
  title: "Alle Spieler",
});


definePageMeta({
  name: "Spieler",
  title: "Alle Spieler",
});

const { data: players } = await useFetch("/api/players/all-players", {
  getCachedData(key) {
    // TODO: Fix this to displayed the time when the data was cached
    return getCachedDataOrFetch(key, nuxtApp);
  },
});

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

const orderedAndFilteredPlayers = computed(() => {
  if (!filteredPlayers.value) return [];
  if (orderBy.value === "victory") {
    return filteredPlayers.value.sort((a, b) => {
      return direction.value === "asc" ? b.wins - a.wins : a.wins - b.wins;
    });
  } else if (orderBy.value === "matches") {
    return filteredPlayers.value.sort((a, b) => {
      return direction.value === "asc"
        ? b.matchesPlayed - a.matchesPlayed
        : a.matchesPlayed - b.matchesPlayed;
    });
  } else {
    return filteredPlayers.value;
  }
});
</script>
