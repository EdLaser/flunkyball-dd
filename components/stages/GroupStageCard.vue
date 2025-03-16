<template>
  <Card>
    <CardHeader>
      <CardTitle>Gruppenphase</CardTitle>
      <CardDescription> Guppen innerhalb der Gruppenphase </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(group, index) in props.groupsWithTeams"
          :key="index"
          class="flex items-center justify-between p-4 border rounded-md bg-muted"
        >
          <div class="flex items-center">
            <span class="text-lg font-semibold">{{ group.group }}</span>
            <span class="text-sm text-muted-foreground">
              {{ group.teams }} Teams
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  groupsWithTeams: Array<{
    group: string;
    teams: number;
  }>;
}>();
</script>
