<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Rang</TableHead>
        <TableHead>Siege</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Spieler</TableHead>
        <TableHead>Spielt in</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(team, index) in teams" :key="team.name">
        <TableCell class="text-lg font-bold">{{ index + 1 }}</TableCell>
        <TableCell>{{ team.wins }}</TableCell>
        <TableCell>
          <div class="flex items-center">
            <Avatar class="w-8 h-8 mr-2 dark:bg-white/70 dark:text-black">
              <AvatarFallback>
                {{ team.name.slice(0, 2).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <NuxtLink
              :to="`/teams/${encodeURIComponent(team.publicID)}`"
              class="text-primary hover:underline"
            >
              {{ team.name }}
            </NuxtLink>
          </div>
        </TableCell>
        <TableCell>
          {{
            team.players.map((p) => `${p.firstName} ${p.lastName}`).join(", ")
          }}
        </TableCell>
        <TableCell>
          {{ team.registeredTournaments.join(", ") || "Keine" }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const props = defineProps<{
  top?: number;
}>();

const nuxtApp = useNuxtApp();

const { data: teams } = await useLazyFetch("/api/teams/all-teams", {
  query: {
    top: props.top,
  },
  transform: (data) => {
    return data.map((team) => ({
      ...team,
      registeredTournaments: team.registeredTournaments.map(
        (tournament) => tournament.title
      ),
    }));
  },
});
</script>
