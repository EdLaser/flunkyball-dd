<template>
  <div class="w-64 space-y-6">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center text-lg">
          <Trophy class="mr-2 h-6 w-6 text-primary" />
          Top Teams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2">
          {topTeams.map((team, index) => (
          <li key="{index}" class="flex justify-between items-center">
            <span class="font-medium">{team.name}</span>
            <span class="text-sm text-muted-foreground"
              >{team.wins}W - {team.losses}L</span
            >
          </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="flex items-center text-lg">
          <User class="mr-2 h-6 w-6 text-primary" />
          Top Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2">
          {topPlayers.map((player, index) => (
          <li key="{index}" class="flex justify-between items-center">
            <span class="font-medium">{player.name}</span>
            <span class="text-sm text-muted-foreground">{player.score}</span>
          </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="flex items-center text-lg">
          <Star class="mr-2 h-6 w-6 text-primary" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm">
          <li>Total Tournaments: 15</li>
          <li>Active Players: 240</li>
          <li>Bottles Flipped: 1,562</li>
          <li>Longest Throw: 18.5m</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Trophy, Star, User } from "lucide-vue-next";

const props = defineProps<{
  topTeams: { name: string; wins: number; losses: number }[];
  topPlayers: { name: string; score: number }[];
}>();
</script>
