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
      <div class="grid">
        <div class="flex items-center gap-5">
          <Avatar>
            <AvatarFallback>
              {{
                props.player.lastName
                  ? props.player.firstName.charAt(0)
                  : props.player.firstName.slice(0, 2)
              }}
              {{ props.player.lastName ? props.player.lastName.charAt(0) : "" }}
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
      <div class="grid grid-cols-2 mt-8">
        <div class="flex col-span-1 flex-col gap-2">
          <span class="flex gap-2 font-semibold"
            ><Trophy />Spiele gespielt:</span
          >
          <InspiraNumberTicker :value="gamesPlayed ?? 0" />
        </div>
      </div>
      <div class="grid md:grid-cols-2 mt-8">
        <div
          class="flex col-span-1 items-center gap-5"
          v-if="props.player.slogan"
        >
          <div class="flex flex-col">
            <span class="font-semibold">Slogan:</span>
            <span class="font-light">{{ props.player.slogan }}</span>
          </div>
        </div>
        <div
          class="flex col-span-1 items-center gap-5"
          v-if="props.player.phone"
        >
          <div class="flex flex-col">
            <span class="font-semibold">Telefon:</span>
            <span class="font-light">{{ props.player.phone }}</span>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter class="font-light text-muted-foreground text-sm text-end">
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Player } from "~/types/Player";
import { Trophy } from "lucide-vue-next";

const props = defineProps<{
  player: Player;
  gamesPlayed?: number;
}>();
</script>
