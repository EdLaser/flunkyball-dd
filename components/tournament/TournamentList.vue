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
            :variant="tournament.status === 'open' ? 'default' : 'secondary'"
          >
            {{ tournament.status }}
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

const props = defineProps<{
  tournaments: {
    title: string;
    description: string;
    tournamentDate: string;
    status: string;
  }[];
}>();
</script>
