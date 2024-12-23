<template>
  <div class="bg-background container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Flunkyball Turniere</h1>

    <Card>
      <CardHeader>
        <CardTitle>Turnier Management</CardTitle>
        <CardDescription class="flex justify-between">
          Hier kannst du alle Turniere verwalten.
          <RefreshButton variant="ghost" @click="refresh" :loading="status === 'pending'" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center space-x-2">
            <Input
              placeholder="Search tournaments..."
              v-model="searchQuery"
              class="w-[300px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" class="ml-auto">
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
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Titel </TableHead>
              <TableHead class="cursor-pointer" @click="handleSort()">
                Datum
                <span>
                  {{ sortDirection === "asc" ? "↑" : "↓" }}
                </span>
              </TableHead>
              <TableHead>Preis</TableHead>
              <TableHead>Ort</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(tournament, index) in filteredAndSortedTournaments"
              :key="index"
            >
              <TableCell class="font-medium">
                {{ tournament.title }}
              </TableCell>
              <TableCell>{{
                tournament.tournamentDate.toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  minute: "2-digit",
                  hour: "2-digit",
                })
              }}</TableCell>
              <TableCell>{{ tournament.price }}</TableCell>
              <TableCell>{{ tournament.location }}</TableCell>
              <TableCell>{{ tournament.description }}</TableCell>
              <TableCell>
                <span
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-blue-300 text-blue-800': tournament.status === 'open',
                    'bg-green-300 text-green-800':
                      tournament.status === 'in_progress',
                    'bg-gray-300 text-gray-800':
                      tournament.status === 'finished',
                  }"
                >
                  {{ tournament.status }}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm"> View Details </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter class="flex justify-between">
        <div class="text-sm text-muted-foreground">
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
        </div>
      </CardFooter>
    </Card>
    <div class="flex justify-end w-full mt-6">
      <NewTournamentDialog />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCcw } from "lucide-vue-next";

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
} = await useFetch("/api/orga/tournaments/all-tournaments", {
  transform: (data) =>
    data.map((tournament) => ({
      ...tournament,
      tournamentDate: new Date(tournament.tournamentDate),
    })),
});

const showFinished = ref(true);
const showOpen = ref(true);
const showInProgress = ref(true);

const sortDirection = ref<"asc" | "desc">("asc");
const searchQuery = ref("");

const filterForStatus = (tournament: any) => {
  if (showOpen.value && tournament.status === "open") return true;
  if (showInProgress.value && tournament.status === "in_progress") return true;
  if (showFinished.value && tournament.status === "finished") return true;
  return false;
};

const handleSort = () => {
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
};

const filterForQuery = (tournament: any) => {
  if (!searchQuery.value) return true;
  return (
    tournament.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    tournament.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const filteredAndSortedTournaments = computed(() => {
  let list = tournaments.value ?? [];

  // Apply filters
  list = list.filter(
    (tournament) => filterForQuery(tournament) && filterForStatus(tournament)
  );

  return list.sort((a, b) => {
    return sortDirection.value === "asc"
      ? a.tournamentDate.getTime() - b.tournamentDate.getTime()
      : b.tournamentDate.getTime() - a.tournamentDate.getTime();
  });
});
</script>
