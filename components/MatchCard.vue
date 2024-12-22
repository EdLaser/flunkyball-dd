<template>
  <Card>
    <CardHeader class="bg-primary text-white rounded-t-md">
      <CardTitle class="flex justify-between items-center">
        <span>{{ stageName }}</span>
        <Badge variant="outline" v-if="group">{{ group }}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between items-center mt-4">
        <div class="flex-1 text-left text-xl font-semibold">
          {{ awayTeamName }}
        </div>
        <div class="mx-2 text-lg">vs</div>
        <div class="flex-1 text-right text-xl font-semibold">
          {{ homeTeamName }}
        </div>
      </div>
      <div
        v-if="winnerTeamName"
        class="mt-4 text-center text-primary font-semibold text-xl flex items-center justify-center"
      >
        <Crown class="mr-2"/>
        Winner: {{ winnerTeamName }}
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-vue-next";

const props = defineProps<MatchProps>();

interface MatchProps {
  stageName: string;
  awayTeamName: string;
  homeTeamName: string;
  group?: string;
  winnerTeamName?: string | null;
}
</script>
