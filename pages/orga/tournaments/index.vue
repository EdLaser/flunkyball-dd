<template>
  <div class="bg-background container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Flunkyball Turniere</h1>

    <Card>
      <CardHeader>
        <CardTitle>Turnier Management</CardTitle>
        <CardDescription class="flex justify-between">
          Hier kannst du alle Turniere verwalten.
          <RefreshButton
            variant="ghost"
            @click="refresh"
            :loading="status === 'pending'"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <!-- <div class="flex justify-between items-center mb-4">
          <div class="grid grid-cols-3 md:grid-cols-5 gap-2">
            <Input
              placeholder="Search tournaments..."
              v-model="searchQuery"
              class="col-span-2 md:col-span-4"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" class="ml-auto col-span-1 h-full">
                  <Filter class="mr-2 h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem v-model:checked="showOpen">
                  Offen
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="showInProgress">
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="showFinished">
                  Vorbei
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div> -->
        <TournamentTable v-if="tournaments" :data="tournaments" />
      </CardContent>
      <CardFooter class="flex justify-between">
        <!-- <div class="text-sm text-muted-foreground">
          Zeige {{ filteredAndSortedTournaments.length }} von
          {{ tournaments?.length }} Turnieren
        </div>
        <div class="text-sm text-muted-foreground flex gap-2">
          <span>
            Filtern nach:
            <small>
              {{ sortDirection === "asc" ? "Aufsteigend" : "Absteigend" }}
            </small>
          </span>
          <span
            >Status:
            <small
              >{{ showOpen ? "Offen" : "" }},
              {{ showInProgress ? "In Progress" : "" }},
              {{ showFinished ? "Vorbei" : "" }}
            </small>
          </span>
          <span v-if="searchQuery">Stichwort: {{ searchQuery }}</span>
        </div> -->
      </CardFooter>
    </Card>
    <div class="flex justify-end w-full mt-6">
      <NewTournamentDialog />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewTournamentDialog from "~/components/tournament/NewTournamentDialog.vue";
import TournamentTable from "~/components/tournament/TournamentTable.vue";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

definePageMeta({
  middleware: "auth",
  title: "Tournaments",
  breadcrumb: [
    {
      text: "Tournaments",
      href: "/orga/tournaments",
    },
  ],
  layout: "dashboard",
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

const {
  data: tournaments,
  status,
  refresh,
} = await useFetch("/api/tournaments/all-tournaments", {
  transform: (data) =>
    data.map((tournament) => ({
      ...tournament,
      tournamentDate: new Date(tournament.tournamentDate),
    })),
});
</script>
