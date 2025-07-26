<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="tournament in tournaments" :key="tournament.title">
        <TableCell>
          <NuxtLink
            :to="`${isOrga ? '/orga/tournaments/' : '/tournaments/'}${
              encodeURIComponent(tournament.title)
            }`"
            class="text-primary hover:underline"
          >
            {{ tournament.title }}
          </NuxtLink>
        </TableCell>
        <TableCell>
          {{ tournament.tournamentDate }}
        </TableCell>
        <TableCell>
          <TournamentStatusBadge
            v-if="tournament.status"
            :status="tournament.status"
          />
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
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const props = defineProps<{
  tournaments: {
    title: string;
    description: string;
    tournamentDate: string;
    status: "finished" | "in_progress" | "open";
  }[];
  isOrga?: boolean;
}>();
</script>
