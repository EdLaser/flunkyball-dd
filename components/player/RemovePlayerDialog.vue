<template>
  <AlertDialog>
    <AlertDialogTrigger as-child><slot /></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Spieler aus {{ props.teamPublicId }} entfernen?</AlertDialogTitle
        >
        <AlertDialogDescription>
          Du bist dabei den Spieler
          <strong>{{ props.playerPublicId }}</strong> aus dem Team
          <strong>{{ props.teamPublicId }}</strong> zu entfernen.
          <br />
          Bist du dir sicher, dass du fortfahren möchtest? Diese Aktion kann
          nicht rückgängig gemacht werden.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
        <AlertDialogAction
          @click="removePlayerFromTeam"
          class="bg-red-500 hover:bg-red-600"
        >
          Fortfahren
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { toast } from "vue-sonner";
const props = defineProps<{
  playerPublicId: string;
  teamPublicId: string;
}>();

const removePlayerFromTeam = async () => {
  try {
    const response = await $fetch(
      `/api/teams/${encodeURIComponent(props.teamPublicId)}/player`,
      {
        method: "DELETE",
        body: { playerPublicID: props.playerPublicId },
      }
    );
    if (response.success) {
      // Emit an event or handle the success case
      toast.success("Spieler erfolgreich entfernt!");
      emit("removed", true);
    } else {
      toast.error("Fehler beim Entfernen des Spielers");
    }
  } catch (error: any) {
    if (error.data) {
      toast.error(error.data.message);
    } else {
      toast.error("Ein Fehler ist aufgetreten");
    }
  }
};

const emit = defineEmits<{
  (e: "removed", isRemoved: boolean): void;
}>();
</script>
