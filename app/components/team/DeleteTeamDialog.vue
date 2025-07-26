<template>
  <AlertDialog>
    <AlertDialogTrigger as-child><slot /></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Team
          <strong>{{ props.teamPublicId }}</strong> löschen?</AlertDialogTitle
        >
        <AlertDialogDescription>
          Du bist dabei das Team
          <strong>{{ props.teamPublicId }}</strong> zu löschen.
          <br />
          Bist du dir sicher, dass du fortfahren möchtest? Diese Aktion kann
          nicht rückgängig gemacht werden.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
        <AlertDialogAction
          @click="deleteTeam"
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
  teamPublicId: string;
}>();

const deleteTeam = async () => {
  try {
    const response = await $fetch(
      `/api/teams/${encodeURIComponent(props.teamPublicId)}`,
      {
        method: "DELETE",
      }
    );
    if (response.success) {
      toast.success("Team erfolgreich gelöscht!");
      emit("removed", true);
    } else {
      toast.error("Fehler beim Entfernen des Teams");
    }
  } catch (error: any) {
    if (error.data) {
      toast.error("Fehler beim löschen des Teams: " + error.data.message);
    } else {
      toast.error("Ein Fehler ist aufgetreten");
    }
  }
};

const emit = defineEmits<{
  (e: "removed", isRemoved: boolean): void;
}>();
</script>
