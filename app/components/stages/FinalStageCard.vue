<template>
  <Card>
    <CardHeader>
      <CardTitle>
        {{ props.stageName }}
      </CardTitle>
    </CardHeader>
    <CardContent></CardContent>
  </Card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  stageName: string;
}>();
</script>
