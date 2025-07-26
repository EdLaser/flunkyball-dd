<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button>Neues Turnier erstellen</Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Turnier erstellen</DialogTitle>
        <DialogDescription>
          Gib die Details für dein neues Turnier ein.
        </DialogDescription>
      </DialogHeader>

      <!-- Use the Vue `@submit.prevent="..."` to prevent default submission -->
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 py-4">
          <!-- Title -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" class="text-right"> Titel </Label>
            <!-- Use v-model for 2-way data binding -->
            <Input id="title" v-model="title" class="col-span-3" required />
          </div>

          <!-- Description -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" class="text-right">
              Beschreibung / Anmerkungen
            </Label>
            <Textarea
              id="description"
              v-model="description"
              class="col-span-3"
              required
            />
          </div>

          <!-- Date -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" class="text-right"> Datum </Label>
            <Input
              id="date"
              type="date"
              v-model="date"
              class="col-span-3"
              required
            />
            <Label htmlFor="time" class="text-right"> Uhrzeit </Label>
            <Input
              id="time"
              type="time"
              v-model="time"
              class="col-span-3"
              required
            />
          </div>

          <!-- Prize -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" class="text-right">
              Preis für die Sieger
            </Label>
            <Input
              id="price"
              type="text"
              v-model="price"
              class="col-span-3"
              required
            />
          </div>

          <!-- Location -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" class="text-right"> Ort </Label>
            <Select required v-model="location">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Ort Auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Orte</SelectLabel>
                  <SelectItem
                    v-for="location in locations"
                    :value="location.name"
                  >
                    {{ location.name }}
                    <small>
                      ({{ location.street }}, {{ location.postal_code }}
                      {{ location.city }})
                    </small>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Turnier erstellen</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "vue-sonner";

// State references (like useState in React)
const title = ref("");
const description = ref("");
const date = ref("");
const time = ref("");
const price = ref("");
const location = ref("");

const { data: locations } = useFetch("/api/orga/locations");

const handleSubmit = async () => {
  try {
    const result = await $fetch("/api/orga/tournaments/new-tournament", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        tournament_date: new Date(date.value + "T" + time.value).toISOString(),
        price: price.value,
        location: location.value,
      }),
    });

    if (result.id) {
      toast("Turnier erfolgreich erstellt!", { duration: 5000 });
      title.value = "";
      description.value = "";
      date.value = "";
      price.value = "";
      location.value = "";
    } else {
      toast("Fehler beim Erstellen des Turniers", { duration: 5000 });
    }
  } catch (error) {
    console.error(error);
    toast("Fehler beim Erstellen des Turniers", { duration: 5000 });
  }
};
</script>
