<template>
  <div class="rounded-md border">
    <h2 class="px-3 pt-3 font-semibold text-lg">{{ groupName }}</h2>
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

<script lang="ts" setup>
import { NuxtLink } from "#components";
import { FlexRender } from "@tanstack/vue-table";
import {
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
} from "@tanstack/vue-table";
import { valueUpdater } from "~/lib/utils";
import { Crown } from "lucide-vue-next";

interface Team {
  name: string;
  publicID?: string;
  wins: number;
  matches: number;
}
const props = defineProps<{
  teams: Array<Team>;
  groupName: string;
}>();

const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Team",
    cell: ({ row }) => {
      const team = row.original;

      return h(
        NuxtLink,
        {
          to: `/teams/${encodeURIComponent(team.publicID ?? "")}`,
          class: "font-semibold text-primary",
        },
        () =>
          h(
            "span",
            { class: "inline-block align-middle flex items-center gap-1" },
            [
              team.name,
              winners.value.some((t) => t.publicID === team.publicID)
                ? h(Crown, { class: "w-4 h-4 text-yellow-500 ml-1" })
                : null,
            ]
          )
      );
    },
  },
  {
    accessorKey: "wins",
    header: "Siege",
  },
  {
    accessorKey: "matches",
    header: "Spiele",
  },
];

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return props.teams;
  },
  get columns() {
    return columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});

table.setSorting([
  { id: "wins", desc: true },
  { id: "matches", desc: true },
]);

const winners = computed(() => {
  const sortedTeams = [...props.teams].sort((a, b) => {
    if (a.wins !== b.wins) {
      return b.wins - a.wins; // Sort by wins descending
    }
    return b.matches - a.matches; // If wins are equal, sort by matches descending
  });
  console.log("Sorted teams:", sortedTeams);
  return sortedTeams.splice(0, 2); // Return top 3 teams
});

console.log("Winners computed:", winners.value);
</script>
