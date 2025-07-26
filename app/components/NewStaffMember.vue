<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserPlus } from "lucide-vue-next";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const newStaffMember = async () => {
  try {
    const result = await $fetch("/api/orga/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button> <UserPlus /> Mitwirkende/r </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Mitwirkende/r</h4>
          <p class="text-sm text-muted-foreground">
            Neue/n Mitwirkende/n hinzufügen
          </p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="first-name">Vorname</Label>
            <Input
              v-model="firstName"
              id="first-name"
              class="col-span-2"
              type="text"
              required
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="last-name">Nachname</Label>
            <Input
              v-model="lastName"
              id="last-name"
              class="col-span-2"
              type="text"
              required
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              id="email"
              type="email"
              class="col-span-2"
              required
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="password">Passwort</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              class="col-span-2"
              required
            />
          </div>
          <Button @click="newStaffMember" class="mt-4"> Hinzufügen </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
