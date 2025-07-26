<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-primary mb-2">
          Join the Flunkyball League
        </h1>
        <p class="text-xl text-primary/80">
          Melde dein Team an und werde Teil der Flunkyball Liga!
        </p>
      </div>
      <!-- Card -->
      <Card class="backdrop-blur-xs shadow-xl border-primary/20">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center">
            Team anmelden
          </CardTitle>
          <CardDescription class="text-center">
            Füll das Formular aus und werde Teil der Flunkyball Liga!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex justify-center space-x-6 mb-6">
            <div class="flex flex-col items-center">
              <Beer
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Beer</span>
            </div>
            <div class="flex flex-col items-center">
              <Trophy
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Triumph</span>
            </div>
            <div class="flex flex-col items-center">
              <Users
                class="h-12 w-12 text-primary mb-2 hover:scale-110 duration-200"
              />
              <span class="text-sm font-semibold">Teamwork</span>
            </div>
          </div>
          <div class="w-full flex justify-between my-4">
            <Switch
              id="create-new-team"
              v-model="createNewTeam"
              @update:checked="toggleCreateNewTeam"
            />
            <Label class="text-lg font-semibold" for="create-new-team">
              Neues Team erstellen
            </Label>
          </div>
          <div v-auto-animate>
            <TeamRegisterNewTeamForm v-if="!createNewTeam" />
            <TeamCreateAndRegisterNewTeamForm v-if="createNewTeam" />
          </div>
        </CardContent>
        <CardFooter>
          <div class="flex w-full justify-center gap-2">
            Als Spieler
            <NuxtLink
              to="/register"
              class="underline decoration-primary underline-offset-4 decoration-2 text-muted-foreground"
            >
              registrieren
            </NuxtLink>
            /<NuxtLink
              to="/login"
              class="underline decoration-primary underline-offset-4 decoration-2 text-muted-foreground"
            >
              anmelden
            </NuxtLink>
          </div>
        </CardFooter>
      </Card>

      <!-- Link to View Teams -->
      <div class="mt-8 text-center">
        <p class="text-secondary-foreground">
          Already registered?
          <NuxtLink to="/teams" class="text-gray-500 hover:underline">
            View all teams
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { Beer, Trophy, Users } from "lucide-vue-next";

useHead({
  title: "Team registrieren",
});

definePageMeta({
  title: "Team registrieren",
  name: "Team registrieren",
});

const [createNewTeam, toggleCreateNewTeam] = useToggle(false);
</script>
