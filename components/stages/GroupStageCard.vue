<template>
  <Card>
    <CardHeader>
      <CardTitle>Gruppenphase</CardTitle>
      <CardDescription class="flex justify-between">
        Guppen innerhalb der Gruppenphase
        <Button  v-if="!isFinal" @click="confirmGroups"> <Beer class="w-4 h-4 mr-1" /> Finalisieren  </Button>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4" v-auto-animate>
        <Card v-for="item in groupsWithTeams" class="">
          <CardHeader>
            <CardTitle>{{ item.group }}</CardTitle>
            <CardDescription> {{ item.teams.length }} Teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 gap-1 md:grid-cols-2">
              <TeamAvatar v-for="team in item.teams" :team="team" />
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { vAutoAnimate } from "@formkit/auto-animate";
import { Beer } from "lucide-vue-next";
import type { GroupWithTeams } from "~/types/Stages";
const props = defineProps<{
  groupsWithTeams: Array<GroupWithTeams>;
  isFinal: boolean;
}>();

const confirmGroups = async () => {};
</script>
