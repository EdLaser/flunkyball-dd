<template>
  <form @submit="onSubmit" id="dialogForm">
    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-full">An Turnier Teilnehmen <Swords /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Für {{ props.tournamentTitle }} registrieren!</DialogTitle
          >
          <DialogDescription>
            Registriere dich für das Turnier "{{ props.tournamentTitle }}".
            Wähle dein Team und registriere dich für die Teilnahme.
          </DialogDescription>
        </DialogHeader>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="teamId">
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Team auswählen!" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="team in allTeamsWithIds"
                      :key="team.publicID"
                      :value="team.publicID"
                    >
                      {{ team.name }} (<strong>{{ team.publicID }}</strong
                      >)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="tournamentTitle">
            <FormItem>
              <FormLabel>Turniertitel</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue :placeholder="props.tournamentTitle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="tournament in tournaments"
                      :key="tournament.title"
                      :value="tournament.title"
                    >
                      {{ tournament.title }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>
        </div>
        <DialogFooter as-child>
          <Button type="submit" form="dialogForm"> Anmelden! <Beer /> </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </form>
</template>

<script lang="ts" setup>
import { Swords, Beer } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";

const registerTeamForTournamentSchema = z.object({
  teamId: z.string().min(1, "Team ID ist erforderlich"),
  tournamentTitle: z.string().min(1, "Turniertitel ist erforderlich"),
});

const props = defineProps<{
  tournamentTitle: string;
}>();

const teamStore = useTeamsStore();
const { allTeamsWithIds } = storeToRefs(teamStore);
callOnce("teasm", () => teamStore.fetchAllTeams());

const { data: tournaments, error } = await useLazyFetch(
  "/api/tournaments/all-tournaments",
  {
    method: "GET",
  }
);

const form = useForm({
  validationSchema: toTypedSchema(registerTeamForTournamentSchema),
  initialValues: {
    teamId: "",
    tournamentTitle: props.tournamentTitle,
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await $fetch(
      `/api/tournaments/${encodeURIComponent(
        values.tournamentTitle.trim()
      )}/register-team`,
      {
        method: "POST",
        body: {
          teamId: values.teamId,
        },
      }
    );
    if (response.success) {
      toast.success("Erfolgreich für das Turnier registriert!");
      form.resetForm();
    } else {
      toast.error("Registrierung fehlgeschlagen: " + response.message);
    }
  } catch (error: any) {
    if (error.data) {
      toast.error("Registrierung fehlgeschlagen: " + error.data.message);
    } else {
      toast.error("Ein Fehler ist aufgetreten");
    }
  }
});
</script>
