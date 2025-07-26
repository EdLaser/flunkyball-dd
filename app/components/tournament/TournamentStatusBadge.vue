<template>
  <div>
    <Popover v-if="session?.isStaff">
      <PopoverTrigger as-child>
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
      </PopoverTrigger>
      <PopoverContent
        class="w-fit backdrop-blur-sm bg-white/20 class flex flex-col gap-3"
      >
        <Badge
          @click="$emit('update:status', newStatus as TournamentStatus)"
          class="capitalize"
          :class="determineBadgeClass(newStatus as TournamentStatus)"
          v-for="newStatus in ['finished', 'open', 'in_progress'].filter(
            (s) => s !== props.status
          )"
          :key="newStatus"
        >
          {{
            newStatus === "finished"
              ? "Das Turnier ist vorbei."
              : newStatus === "open"
              ? "Das Turnier ist offen für Anmeldungen."
              : newStatus === "in_progress"
              ? "Das Turnier läuft gerade."
              : ""
          }}
        </Badge>
      </PopoverContent>
    </Popover>
    <Badge v-else class="capitalize" :class="determineBadgeClass(status)">
      {{
        status === "finished"
          ? "Vorbei"
          : status === "open"
          ? "Offen"
          : status === "in_progress"
          ? "In Progress"
          : ""
      }}
    </Badge >
  </div>
</template>

<script lang="ts" setup>
type TournamentStatus = "finished" | "open" | "in_progress";

const props = defineProps<{
  status: TournamentStatus;
}>();

const emits = defineEmits<{
  (e: "update:status", status: TournamentStatus): void;
}>();

const { session } = useUserSession();
</script>
