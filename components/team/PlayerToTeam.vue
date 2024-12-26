<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-vue-next";

const props = defineProps<{
  teamName: string;
  players: Array<{ firstName: string; lastName: string; publicId: string }>;
}>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="icon"> <UserPlus /> </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80 md:w-96">
      <div class="grid space-y-4">
        <p class="text-lg text-center">Team: {{ props.teamName }}</p>
        <small
          >Weise dem Team:
          <span class="font-semibold">{{ props.teamName }}</span> Spieler
          zu</small
        >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Spieler wählen..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="player in players" :value="player.firstName">
                {{ player.firstName }}
                <small class="font-semibold">{{ player.publicId }}</small>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Zuweisen</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
