<template>
  <Card>
    <CardContent class="p-5 md:p-7">
      <div class="grid grid-cols-2">
        <div class="pr-5">
          <div class="grid">
            <div class="flex flex-col">
              <span class="font-semibold text-xl">
                {{ props.team.name }}
              </span>
              <div class="flex justify-between gap-2">
                <span class="flex gap-2 items-center text-sm font-semibold">
                  <IdCard />ID:
                </span>
                <NuxtLink
                  v-if="props.team.publicID"
                  :to="`/players/${encodeURIComponent(props.team.publicID)}`"
                  class="text-sm font-light underline underline-offset-1 text-primary"
                  >{{ props.team.publicID }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <Separator class="my-4" label="Stats" />

          <div class="grid gap-2">
            <div class="flex justify-between gap-2">
              <span class="flex gap-2 font-semibold">
                <Swords />
                Spiele:
              </span>
              {{ gamesPlayed ?? 0 }}
            </div>
            <div class="flex justify-between gap-2">
              <span class="flex gap-2 font-semibold">
                <Trophy />
                Siege:
              </span>
              {{ props.wins ?? 0 }}
            </div>
            <div class="flex justify-between gap-2">
              <span class="flex gap-2 font-semibold">
                <Beer />
                Liter:
              </span>
              {{ gamesPlayed ? gamesPlayed * 0.5 : 0.0 }} L
            </div>
          </div>
          <Separator class="my-4" label="Social" />
          <div class="grid gap-2">
            <div class="flex items-center justify-between" v-if="props.playsIn">
              <span class="flex gap-2 font-semibold"><Medal /> Team:</span>
              <NuxtLink class="font-light"> {{ props.playsIn }}</NuxtLink>
            </div>
            <div class="flex items-center gap-5" v-if="props.team.slogan">
              <div class="flex flex-col gap-1">
                <span class="flex gap-2 font-semibold"><Speech />Slogan:</span>
                <span class="font-light">{{ props.team.slogan }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Trophy, Beer, Medal, Swords, Speech, IdCard } from "lucide-vue-next";
import { Separator } from "../ui/separator";
import type { Team } from "~/types/Team";
import type { Player } from "~/types/Player";

const props = defineProps<{
  team: Team;
  gamesPlayed?: number;
  playsIn?: string;
  wins?: number;
}>();
</script>
