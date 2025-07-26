<template>
  <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
    <OverviewRankingTable
      v-for="group in props.groupWithRanking"
      :teams="group.teams"
      :key="group.groupId"
      :group-name="group.groupName"
    >
    </OverviewRankingTable>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Team {
  name: string;
  publicID?: string;
  wins: number;
  matches: number;
}

interface GroupWithRanking {
  groupId: string;
  groupName: string;
  teams: Team[];
}

const props = defineProps({
  groupWithRanking: {
    type: Array as PropType<GroupWithRanking[]>,
    required: true,
  },
});
</script>
