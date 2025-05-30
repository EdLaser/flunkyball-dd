<template>
  <Card>
    <CardContent class="p-5 md:p-7">
      <div class="grid grid-cols-2">
        <div class="pr-5">
          <div class="grid">
            <div class="flex flex-col">
              <span class="font-semibold text-xl">
                {{ props.player.firstName }} {{ props.player.lastName }}
              </span>
              <div class="flex justify-between gap-2">
                <span class="flex gap-2 items-center text-sm font-semibold">
                  <IdCard />ID:
                </span>
                <NuxtLink
                  v-if="props.player.publicID"
                  :to="`/players/${encodeURIComponent(props.player.publicID)}`"
                  class="text-sm font-light underline underline-offset-1 text-primary"
                  >{{ props.player.publicID }}</NuxtLink
                >
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
            :image="player.avatarLink ?? undefined"
          />
        </div>
      </div>
    </CardContent>
    <CardFooter
      class="flex justify-end"
      v-if="
        !noUpload &&
        loggedIn &&
        session.user?.publicID === props.player.publicID
      "
    >
      <UploadFileDialog />
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Player } from "~/types/Player";
import { Trophy, Beer, Medal, Swords, Speech, IdCard } from "lucide-vue-next";
import { Separator } from "../ui/separator";

const { session, loggedIn } = useUserSession();

const props = defineProps<{
  player: Player;
  gamesPlayed?: number;
  playsIn?: string;
  wins?: number;
  noUpload?: boolean;
}>();
</script>
