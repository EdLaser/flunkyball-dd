<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Rank</TableHead>
        <TableHead>Team</TableHead>
        <TableHead>Members</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="team in teams" :key="team.id">
        <TableCell>{{ team.rank }}</TableCell>
        <TableCell>
          <div class="flex items-center">
            <Avatar class="h-8 w-8 mr-2">
              <AvatarFallback>
                {{ team.name.slice(0, 2).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <!-- Replace Next.js Link with NuxtLink -->
            <NuxtLink
              :to="`/orga/teams/${team.id}`"
              class="text-primary hover:underline"
            >
              {{ team.name }}
            </NuxtLink>
          </div>
        </TableCell>
        <TableCell>
          {{ team.members.join(", ") }}
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
const teams = [
  { id: "1", name: "Bottle Bashers", rank: 1, members: ["Alice", "Bob"] },
  { id: "2", name: "Flunky Fanatics", rank: 2, members: ["Charlie", "Diana"] },
  { id: "3", name: "Tipsy Tossers", rank: 3, members: ["Eve", "Frank"] },
  { id: "4", name: "Sling Kings", rank: 4, members: ["Grace", "Henry"] },
];
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
</script>
