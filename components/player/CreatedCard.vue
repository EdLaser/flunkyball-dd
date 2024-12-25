<template>
  <Card>
    <CardHeader>
      <CardTitle>Willkommen {{ props.player.firstName }}</CardTitle>
      <CardDescription>
        Willkommen bei unseren Flunkyball Turnieren! Danke für deine Teilnahme.
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
            <div class="space-x-2 flex items-center">
              <span class="text-sm font-semibold">ID:</span>
              <span class="text-sm">{{ props.player.publicID }}</span>
              <ClipboardCopy
                v-if="isSupported && props.player.publicID && !copied"
                v-auto-animate
                class="hover:cursor-pointer h-5 w-5 text-muted-foreground"
                @click="copy(props.player.publicID)"
              />
              <ClipboardCheck
                v-auto-animate
                v-if="copied"
                class="h-5 w-5 text-primary"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 mt-8">
        <div
          class="flex col-span-1 items-center gap-5"
          v-if="props.player.slogan"
        >
          <div class="flex flex-col">
            <span class="font-semibold">Slogan:</span>
            <span class="font-mono">{{ props.player.slogan }}</span>
          </div>
        </div>
        <div
          class="flex col-span-1 items-center gap-5"
          v-if="props.player.phone"
        >
          <div class="flex flex-col">
            <span class="font-semibold">Telefon:</span>
            <span class="font-serif">{{ props.player.phone }}</span>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter class="font-medium text-muted-foreground text-sm text-end">
      Bitte speichere dir deine ID für später.
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import type { Player } from "~/types/Player";
import { ClipboardCopy, ClipboardCheck } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";
import { toast } from "vue-sonner";
import { vAutoAnimate } from "@formkit/auto-animate";

const props = defineProps<{
  player: Player;
}>();

const { text, copy, copied, isSupported } = useClipboard();

watch(copied, (value) => {
  if (value) {
    toast("ID kopiert", {
      description: `Deine ID ${text.value} wurde in die Zwischenablage kopiert.`,
      duration: 3000,
    });
  }
});
</script>

<style scoped></style>
