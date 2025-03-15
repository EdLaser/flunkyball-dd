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
            :to="`/tournaments/${tournament.title}`"
            class="text-primary hover:underline"
          >
            {{ tournament.title }}
          </NuxtLink>
        </TableCell>
        <TableCell>
          {{ tournament.tournamentDate }}
        </TableCell>
        <TableCell>
          <Badge
            :class="determineBadgeClass(tournament.status as 'finished' | 'open' | 'in_progress')"
          >
            {{
              tournament.status === "finished"
                ? "Vorbei"
                : tournament.status === "open"
                ? "Offen"
                : tournament.status === "in_progress"
                ? "In Progress"
                : ""
            }}
          </Badge>
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
import { Badge } from "@/components/ui/badge";

const determineBadgeClass = (status: "finished" | "open" | "in_progress") => {
  switch (status) {
    case "finished":
      return "bg-red-500 hover:bg-red-400";
    case "open":
      return "bg-green-500 hover:bg-green-400";
    case "in_progress":
      return "bg-yellow-500 hover:bg-yellow-400";
    default:
      return "";
  }
};

const props = defineProps<{
  tournaments: {
    title: string;
    description: string;
    tournamentDate: string;
    status: string;
  }[];
}>();
</script>
