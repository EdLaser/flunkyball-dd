<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="text-sm font-medium">
        {{ title }}
      </CardTitle>
      <!-- Dynamically render the icon component -->
      <component :is="icon" class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        {{ value }}
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface StatCardProps {
  title: string;
  value: string;
  icon: any;
}

const props = defineProps<StatCardProps>();
</script>
