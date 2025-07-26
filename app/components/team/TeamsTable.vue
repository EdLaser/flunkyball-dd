<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerToTeam from "./PlayerToTeam.vue";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table";
import type { SortingState, ColumnFiltersState } from "@tanstack/vue-table";
import { valueUpdater } from "~/lib/utils";
import { Button } from "../ui/button";
import { ArrowUpAZ, ArrowDownAZ } from "lucide-vue-next";
import { NuxtLink } from "#components";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Player {
  firstName: string;
  lastName: string;
  slogan: string;
}

interface Team {
  name: string;
  slogan: string;
  players: Array<Player>;
  registeredTournaments: Array<string>;
}

const { data: allPlayers } = await useFetch("/api/players/all-players");

const props = defineProps<{
  data: Team[];
}>();

const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h(Avatar, { class: "h-8 w-8 mr-2 dark:bg-white/70 dark:text-black" }, () => [
          h(AvatarFallback, null, () => {
            const name = row.getValue("name") as string;
            return name.slice(0, 2).toUpperCase();
          }),
        ]),
        h(
          NuxtLink,
          {
            to: `/orga/teams/${row.getValue("name")}`,
            class: "text-primary hover:underline",
          },
          () => row.getValue("name")
        ),
      ]);
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          "Name",
          h(column.getIsSorted() === "asc" ? ArrowUpAZ : ArrowDownAZ, {
            class: "ml-2 h-4 w-4",
          }),
        ]
      );
    },
  },
  {
    accessorKey: "slogan",
    header: "Slogan",
  },
  {
    accessorKey: "players",
    header: "Spieler",
    cell: ({ row }) => {
      const players = row.getValue("players") as Player[] | null;
      if (players && players.length > 0) {
        return h(
          "div",
          { class: "flex flex-col" },
          players.map((player: Player) => {
            return h("div", { class: "flex items-center" }, [
              h(Avatar, { class: "h-8 w-8 mr-2" }, () => [
                h(AvatarFallback, null, () => {
                  const name = `${player.firstName} ${player.lastName}`;
                  return name.slice(0, 2).toUpperCase();
                }),
              ]),
              h(
                "div",
                { class: "text-sm" },
                `${player.firstName} ${player.lastName}`
              ),
            ]);
          })
        );
      } else {
        return h(PlayerToTeam, {
          teamName: row.getValue("name"),
          players: allPlayers.value,
        });
      }
    },
  },
  {
    accessorKey: "registeredTournaments",
    header: "Registriert für",
    cell: ({ row }) => {
      const tournaments = row.getValue("registeredTournaments") as
        | string[]
        | null;
      if (tournaments && tournaments.length > 0) {
        return h(
          "div",
          { class: "flex flex-col" },
          tournaments.map((tournament: string) => {
            return h("div", { class: "text-sm" }, tournament);
          })
        );
      } else {
        return h("div", { class: "text-sm" }, "add tournaments");
      }
    },
  },
];

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
});

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
