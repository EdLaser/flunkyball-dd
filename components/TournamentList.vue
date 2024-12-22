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
      <TableRow v-for="tournament in tournaments" :key="tournament.id">
        <TableCell>
          <NuxtLink
            :to="`/tournaments/${tournament.id}`"
            class="text-primary hover:underline"
          >
            {{ tournament.name }}
          </NuxtLink>
        </TableCell>
        <TableCell>
          {{ tournament.date }}
        </TableCell>
        <TableCell>
          <!-- Example logic for 'Badge' variants -->
          <Badge
            :variant="
              tournament.status === 'Upcoming' ? 'default' : 'secondary'
            "
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

// The data array:
const tournaments = [
  {
    id: "1",
    name: "Summer Flunkyball Showdown",
    date: "July 15, 2023",
    status: "Upcoming",
  },
  {
    id: "2",
    name: "Autumn Bottle Bash",
    date: "September 22, 2023",
    status: "Registration Open",
  },
  {
    id: "3",
    name: "Winter Wonderland Flunky",
    date: "December 10, 2023",
    status: "Planning",
  },
];
</script>
