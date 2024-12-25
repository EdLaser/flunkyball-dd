<template>
  <Card :class="props.class">
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="text-base font-medium">
        {{ title }}
      </CardTitle>
      <!-- Dynamically render the icon component -->
      <component :is="icon" class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        <InspiraNumberTicker v-if="isNumber(value)" :value="value as number" />
        <span v-else>{{ value }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const isNumber = (val: any) => typeof val === "number" && val === val;

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  class?: string;
}

const props = defineProps<StatCardProps>();
</script>
