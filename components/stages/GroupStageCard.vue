<template>
  <Card v-auto-animate>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <NuxtLink class="text-primary" :to="`/orga/tournaments/${tournamentTitle}/group-phase`">Gruppenphase</NuxtLink>  <Loader2 v-if="loadingGroupStage" class="animate-spin" />
      </CardTitle>
      <ClientOnly>
        <CardDescription class="max-w-xs">
          <div class="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
            <div class="flex gap-2 py-1">
              <ButtonWithAction
                v-for="action in actionItems"
                :key="action.text"
                :icon="action.icon"
                :disabled="action.disabled"
                :text="action.text"
                :action="action.action"
              />
            </div>
          </div>
        </CardDescription>
      </ClientOnly>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4" v-auto-animate>
        <Card
          v-for="item in groupStage"
          :class="{
            'border-dashed': !item.isFinalized,
          }"
        >
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
import { Beer, Swords, Hammer, Loader2, Save } from "lucide-vue-next";

const props = defineProps<{
  hasGroupPhase: boolean;
  groupStageHasMatches: boolean;
}>();

const groupStageStore = useGroupStageStore();
const { groupStage, loadingGroupStage } = storeToRefs(groupStageStore);

const tournamentTitle = useRoute().params.title as string;

const actionItems = computed(() => {
  const items = [
    {
      text: "Generieren",
      icon: Swords,
      action: groupStageStore.calculateGroupStage,
    },
    {
      text: "Speichern",
      icon: Save,
      action: groupStageStore.confirmGroupStage,
      disabled: groupStage.value.length === 0,
    },
    {
      text: "Finalisieren",
      icon: Beer,
      action: () => groupStageStore.confirmGroupStage(true),
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
