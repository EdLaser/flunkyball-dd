<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCheck, UserX } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toast } from "vue-sonner";

const showPlayers = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    slogan: z.string().min(2).max(100),
    firstPlayer: z.string().nullable(),
    secondPlayer: z.string().nullable(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const allPlayers = ref<
  Array<{
    firstName: string;
    lastName: string | null;
    publicID: string;
    playsIn: string | null;
  }>
>([]);

const fetchPlayers = async () => {
  try {
    const players = await $fetch("/api/players/all-players");
    allPlayers.value = players;
  } catch (error) {
    toast("Fehler beim Laden der Spieler.", {
      duration: 3000,
      icon: UserX,
      description: "Die Spieler konnten nicht geladen werden.",
    });
  }
};

watch(showPlayers, async (value) => {
  if (value && allPlayers.value.length === 0) {
    await fetchPlayers();
  }
});

const createTeam = async (values: { name: string; slogan: string }) => {
  try {
    const team = await $fetch("/api/orga/new-team", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (team) {
      toast("Team wurde erfolgreich erstellt.", {
        duration: 3000,
        icon: UserCheck,
        description: `Das Team ${values.name} wurde erfolgreich erstellt.`,
      });
    }
  } catch (error) {
    console.error(error);
    toast("Fehler beim Erstellen des Teams.", {
      duration: 3000,
      icon: UserX,
      description: `Das Team ${values.name} konnte nicht erstellt werden.`,
    });
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  await createTeam(values);
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Team hinzufügen </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Team hinzufügen</DialogTitle>
        <DialogDescription>
          Füge ein neues Team hinzu, um Mitglieder zu organisieren.
        </DialogDescription>
      </DialogHeader>
      <div class="flex gap-2 text-sm text-muted-foreground justify-end">
        Spieler hinzufügen
        <Switch v-model:checked="showPlayers" />
      </div>
      <form @submit.prevent="onSubmit()" id="add-team-form">
        <div class="grid space-y-4 py-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="grid items-center" v-auto-animate>
              <FormLabel>Team-Name</FormLabel>
              <FormControl>
                <Input id="team-name" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="slogan">
            <FormItem class="grid items-center">
              <FormLabel>Slogan</FormLabel>
              <FormControl>
                <Input id="slogan" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <div v-if="showPlayers && allPlayers.length > 0" class="space-y-4">
            <FormField v-slot="{ componentField }" name="firstPlayer">
              <FormItem>
                <FormLabel>Spieler 1</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger class="">
                      <SelectValue placeholder="Spieler wählen..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <template v-if="allPlayers.length > 0">
                        <SelectItem
                          v-for="player in allPlayers"
                          :key="player.firstName"
                          :value="player.publicID"
                        >
                          {{ player.firstName }} {{ player.lastName }}
                          <small>
                            {{ player.publicID }}
                          </small>
                        </SelectItem>
                      </template>
                      <template v-else>
                        <SelectItem disabled :value="'none'">
                          Keine Spieler verfügbar
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="secondPlayer">
              <FormItem>
                <FormLabel>Spieler 2</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Spieler wählen..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <template v-if="allPlayers.length > 0">
                        <SelectItem
                          v-for="player in allPlayers"
                          :key="player.firstName"
                          :value="player.publicID"
                        >
                          {{ player.firstName }} {{ player.lastName }}
                          <small>
                            {{ player.publicID }}
                          </small>
                        </SelectItem>
                      </template>
                      <template v-else>
                        <SelectItem disabled :value="'none'">
                          Keine Spieler verfügbar
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>
          </div>
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" form="add-team-form"> Erstellen </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
