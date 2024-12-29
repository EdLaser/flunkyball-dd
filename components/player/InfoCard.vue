<template>
  <Card>
    <CardHeader>
      <CardTitle
        >{{ props.player.firstName }} {{ props.player.lastName }}</CardTitle
      >
      <CardDescription>
        {{ props.player.slogan }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div class="grid grid-cols-2">
        <div class="pr-5">
          <div class="grid">
            <div class="flex md:flex-row flex-col md:items-center gap-5">
              <Avatar>
                <AvatarFallback>
                  {{
                    props.player.lastName
                      ? props.player.firstName.charAt(0)
                      : props.player.firstName.slice(0, 2)
                  }}
                  {{
                    props.player.lastName ? props.player.lastName.charAt(0) : ""
                  }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <span class="font-semibold">
                  {{ props.player.firstName }} {{ props.player.lastName }}
                </span>
                <div class="space-x-2">
                  <span class="text-sm font-semibold">ID:</span>
                  <span class="text-sm font-light">{{
                    props.player.publicID
                  }}</span>
                </div>
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
              <InspiraNumberTicker
                :value="gamesPlayed ?? 0"
                :decimal-places="0"
              />
            </div>
            <div class="flex justify-between gap-2">
              <span class="flex gap-2 font-semibold">
                <Trophy />
                Siege:
              </span>
              <InspiraNumberTicker :value="wins ?? 0" :decimal-places="0" />
            </div>
            <div class="flex justify-between gap-2">
              <span class="flex gap-2 font-semibold">
                <Beer />
                Liter:
              </span>
              <InspiraNumberTicker
                :value="gamesPlayed ? gamesPlayed * 0.5 : 0"
                :decimal-places="1"
                as-liter
              />
            </div>
          </div>
          <Separator class="my-4" label="Social" />
          <div class="grid gap-2">
            <div class="flex items-center justify-between" v-if="props.playsIn">
              <span class="flex gap-2 font-semibold"><Medal /> Team:</span>
              <NuxtLink class="font-light"> {{ props.playsIn }}</NuxtLink>
            </div>
            <div class="flex items-center gap-5" v-if="props.player.slogan">
              <div class="flex flex-col gap-1">
                <span class="flex gap-2 font-semibold"><Speech />Slogan:</span>
                <span class="font-light">{{ props.player.slogan }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <InspiraFlipCard
            :title="player.firstName"
            :subtitle="`Wer ist ${player.firstName}`"
            :description="player.slogan ?? ''"
          />
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end" v-if="!noUpload">
      <UploadFileDialog />
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Player } from "~/types/Player";
import { Trophy, Beer, Medal, Swords, Speech } from "lucide-vue-next";
import { Separator } from "../ui/separator";

const props = defineProps<{
  player: Player;
  gamesPlayed?: number;
  playsIn?: string;
  wins?: number;
  noUpload?: boolean;
}>();
</script>
