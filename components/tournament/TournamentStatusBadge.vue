<template>
  <Badge class="capitalize" :class="determineBadgeClass(status)">
    {{
      status === "finished"
        ? "Vorbei"
        : status === "open"
        ? "Offen"
        : status === "in_progress"
        ? "In Progress"
        : ""
    }}
  </Badge>
</template>

<script lang="ts" setup>
const props = defineProps<{
  status: "finished" | "in_progress" | "open";
}>();
</script>
