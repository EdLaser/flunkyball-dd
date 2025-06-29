<template>
  <div>
    <header class="shadow-md bg-primary text-primary-foreground">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="text-3xl font-bold">Team Details</h1>
      </div>
    </header>
    <main
      class="container px-4 py-8 mx-auto space-y-8"
      v-if="team"
      v-auto-animate
    >
      <TeamInfoCard
        v-if="team"
        :team="team"
        :games-played="team.totalMatches"
        :wins="team.wins"
      />
      <div
        class="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2"
      >
        <p>Spieler</p>
        <Button
          v-if="team.players && team.players.length > 0"
          @click="toggleIsEditing()"
          variant="outline"
        >
          Editieren
          <Edit2 />
        </Button>
        <TeamPlayerToTeam
          v-if="(isEditing && team.publicID) || !team.players || team.players.length === 0"
          :team-name="team.name"
          :team-public-id="team.publicID"
          @assigned="refresh()"
        />
      </div>
      <div class="grid gap-3 lg:grid-cols-2" v-if="team && team.players">
        <PlayerInfoCard
          v-for="player in team.players"
          :player="player"
          :games-played="player?.gamesPlayed ?? 0"
          :plays-in="player.playsIn ?? ''"
          :wins="player?.wins ?? 0"
          :edit="isEditing"
          @removed="(e) => toggleRemove(e)"
        />
      </div>
    </main>
    <p v-else>
      Team not found. Please check the public ID or ensure the team exists.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useToggle } from "@vueuse/core";
import { Edit2 } from "lucide-vue-next";
const route = useRoute();

const [isEditing, toggleIsEditing] = useToggle(false);

useHead({
  title: `Team ${decodeURIComponent(route.params.publicID as string)}`,
});

const { data: team, refresh } = await useFetch(
  () => `/api/teams/${encodeURIComponent(route.params.publicID as string)}`
);

const toggleRemove = (removed: boolean) => {
  if (removed) refresh();
};
</script>
