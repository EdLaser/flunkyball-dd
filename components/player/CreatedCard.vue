<template>
  <Card>
    <CardHeader>
      <CardTitle>Willkommen {{ props.player.firstName }}</CardTitle>
      <CardDescription>
        Willkommen bei unseren Flunkyball Turnieren! Danke für deine Teilnahme.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div class="grid grid-cols-2">
        <div class="flex col-span-2 items-center gap-5">
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
        <div class="flex col-span-1 items-center gap-5" v-if="props.player.slogan">
          <div class="flex flex-col">
            <span class="font-semibold">Slogan:</span>
            <span class="font-light">{{ props.player.slogan }}</span>
          </div>
        </div>
        <div class="flex col-span-1 items-center gap-5" v-if="props.player.phone">
          <div class="flex flex-col">
            <span class="font-semibold">Telefon:</span>
            <span class="font-light">{{ props.player.phone }}</span>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter class="font-light text-muted-foreground text-sm text-end">
      Bitte speichere dir deine ID für später.
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Player } from "~/types/Player";

const props = defineProps<{
  player: Player;
}>();
</script>

<style scoped></style>
