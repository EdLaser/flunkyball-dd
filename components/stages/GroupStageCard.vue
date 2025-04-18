<template>
  <Card>
    <CardHeader>
      <CardTitle>Gruppenphase</CardTitle>
      <CardDescription class="flex gap-2.5 overflow-x-scroll">
        <ButtonWithAction
          v-for="action in actionItems"
          :key="action.text"
          :icon="action.icon"
          :disabled="action.disabled"
          :text="action.text"
          :action="action.action"
        />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4" v-auto-animate>
        <Card v-for="item in groupStage">
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
import { Beer, Swords, Hammer } from "lucide-vue-next";

const props = defineProps<{
  hasGroupPhase: boolean;
  groupStageHasMatches: boolean;
}>();

const groupStageStore = useGroupStageStore();
const { groupStage } = storeToRefs(groupStageStore);

const actionItems = computed(() => {
  const items = [
    {
      text: "Generieren",
      icon: Swords,
      action: groupStageStore.calculateGroupStage,
    },
    {
      text: "Finalisieren",
      icon: Beer,
      action: groupStageStore.confirmGroupStage,
      disabled: !canBeFinalized.value,
    },
  ];
  if (!props.hasGroupPhase) {
    items.push({
      text: "Erstellen",
      icon: Hammer,
      action: groupStageStore.createGroupStage,
    });
  }
  return items;
});

const canBeFinalized = computed(() => {
  return (
    groupStage.value.length > 0 &&
    groupStage.value.every((group) => group.teams.length > 0)
  );
});
</script>
