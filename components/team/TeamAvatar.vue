<template>
  <div class="flex items-center space-x-2">
    <Avatar>
      <AvatarFallback>
        {{ team.name?.substring(0, 2).toUpperCase() ?? "AN" }}
      </AvatarFallback>
    </Avatar>
    <div>
      <NuxtLink
        :to="`/orga/teams/${encodeURIComponent(team.publicID ?? '')}`"
        class="font-semibold text-primary"
      >
        {{ team.name }}
      </NuxtLink>
      <p class="text-sm text-muted-foreground">
        {{
          team.players
            .map((player) => `${player.firstName} ${player.lastName ?? ""}`)
            .join(", ")
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  team: {
    name: string;
    publicID: string | null;
    players: { firstName: string; lastName: string | null }[];
  };
}>();
</script>
