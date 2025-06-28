<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="teamPublicId">
      <FormItem>
        <FormLabel class="font-semibold">Team</FormLabel>
        <Select v-bind="componentField" :disabled="loadingTeams">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Wähle ein Team aus!" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="team in teams"
                :key="team.publicID"
                :value="team.publicID"
              >
                {{ team.name }} (<strong>{{ team.publicID }}</strong
                >)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription class="text-secondary-foreground">
          Wähle ein bestehendes Team aus und weise Spieler zu.
        </FormDescription>
      </FormItem>
    </FormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="grid grid-cols-1 gap-3">
        <span class="md:col-span-2 text-xl">Spieler 1</span>
        <FormField name="player1.publicID" v-slot="{ componentField }">
          <FormItem>
            <FormLabel class="font-semibold">Spieler</FormLabel>
            <Select v-bind="componentField" :disabled="loadingPlayers">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wähle einen Spieler aus!" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="player in players"
                    :key="player.publicID"
                    :value="player.publicID"
                  >
                    {{ player.firstName }} {{ player.lastName }} (<strong>
                      {{ player.publicID }} </strong
                    >)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <span class="md:col-span-2 text-xl">Spieler 2</span>
        <FormField name="player2.publicID" v-slot="{ componentField }">
          <FormItem>
            <FormLabel class="font-semibold">Spieler</FormLabel>
            <Select v-bind="componentField" :disabled="loadingPlayers">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wähle einen Spieler aus!" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="player in players"
                    :key="player.publicID"
                    :value="player.publicID"
                  >
                    {{ player.firstName }} {{ player.lastName }} (<strong>
                      {{ player.publicID }} </strong
                    >)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <FormMessage />
        </FormField>
      </div>
    </div>
    <div class="flex justify-end">
      <Button type="submit" class="w-full md:w-auto">
        Spieler zuweisen <Users class="inline h-4 w-4 ml-2" />
      </Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { Users } from "lucide-vue-next";

const teamStore = useTeamsStore();
const { allTeamsWithIds: teams, loadingTeams } = storeToRefs(teamStore);

const playerStore = usePlayersStore();
const { allPlayersWithIds: players, loadingPlayers } = storeToRefs(playerStore);

await callOnce("teams", () => teamStore.fetchAllTeams());
await callOnce("players", () => playerStore.fetchAllPlayers());

const teamSchema = toTypedSchema(
  z
    .object({
      teamPublicId: z.string().min(4),
      player1: z.object({
        publicID: z.string().min(4),
      }),
      player2: z.object({
        publicID: z.string().min(4),
      }),
    })
    .refine((data) => {
      if (data.player1.publicID && data.player2.publicID) {
        if (data.player1.publicID === data.player2.publicID) {
          toast.warning("Die Spieler dürfen nicht dieselbe Public-ID haben.");
          return false;
        } else {
          return true;
        }
      }
    })
);

const form = useForm({
  validationSchema: teamSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const result = await $fetch(`/api/teams/${values.teamPublicId}/player`, {
      method: "PUT",
      body: [values.player1.publicID, values.player2.publicID],
    });
    if (result.count === 2) {
      toast.success("Spieler erfolgreich festgelegt!");
    } else {
      toast.error(
        "Fehler bei der Spielerregistrierung. Bitte versuche es erneut."
      );
    }
  } catch (error: any) {
    console.error("Fehler beim Registrieren des Teams:", error.data);
    if (error.data.data) {
      toast.error("Fehler beim Registrieren des Teams: " + error.data.data);
    } else {
      toast.error("Ein unbekannter Fehler ist aufgetreten.");
    }
  }
});
</script>
