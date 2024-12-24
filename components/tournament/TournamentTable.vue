<script setup lang="ts" generic="TData, TValue">
import type { Column, ColumnDef } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { SortingState, ColumnFiltersState } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";
import { valueUpdater } from "~/lib/utils";
import { Button } from "../ui/button";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Filter } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const props = defineProps<{
  data: Tournament[];
  query?: string;
}>();

interface Tournament {
  title: string;
  tournamentDate: Date;
  location: string;
  description: string | null;
  status: "finished" | "open" | "in_progress";
}

const determineSortingIcon = (column: Column<Tournament>) => {
  if (column.getIsSorted()) {
    if (column.getIsSorted() === "asc") {
      return h(ArrowUpAZ, { class: "ml-2 h-4 w-4" });
    } else if (column.getIsSorted() === "desc") {
      return h(ArrowDownAZ, { class: "ml-2 h-4 w-4" });
    }
  } else {
    return h(ArrowUpDown, { class: "ml-2 h-4 w-4" });
  }
};

const toggleSorting = (column: Column<Tournament>) => {
  if (column.getIsSorted() === "asc") {
    column.toggleSorting(true);
  } else if (column.getIsSorted() === "desc") {
    column.toggleSorting(false);
  } else {
    column.toggleSorting(true);
  }
};

const determineBadgeClass = (status: Tournament["status"]) => {
  switch (status) {
    case "finished":
      return "bg-red-500";
    case "open":
      return "bg-green-500";
    case "in_progress":
      return "bg-yellow-500";
    default:
      return "";
  }
};

const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "tournamentDate",
    cell: ({ row }) => {
      return (row.getValue("tournamentDate") as Date).toLocaleDateString(
        "de-DE",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    },
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => toggleSorting(column),
        },
        () => ["Datum", determineSortingIcon(column)]
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "description",
    header: "Details",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Tournament["status"];

      return h(
        Badge,
        {
          variant: "outline",
          class: determineBadgeClass(status),
        },
        {
          default: () =>
            status === "finished"
              ? "Vorbei"
              : status === "open"
              ? "Offen"
              : status === "in_progress"
              ? "In Progress"
              : "",
        }
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return h(
        Button,
        {
          onClick: () => {
            console.log("Edit tournament", row.original);
          },
          variant: "ghost",
          class: "text-xs",
        },
        { default: () => "Alle Details" }
      );
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
  <div class="space-y-4">
    <div class="grid grid-cols-3 md:grid-cols-5 gap-2">
      <Input
        class="cols-span-2 md:col-span-4"
        placeholder="Filter Tournaments..."
        :model-value="table.getColumn('title')?.getFilterValue() as string"
        @update:model-value="table.getColumn('title')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" class="w-full col-span-1 h-full">
            <Filter class="mr-2 h-4 w-4" /> Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            :checked="table.getColumn('status')?.getFilterValue() === 'open'"
            @update:model-value="
              table.getColumn('status')?.setFilterValue($event)
            "
          >
            Offen
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            :checked="
              table.getColumn('status')?.getFilterValue() === 'in_progress'
            "
            @update:model-value="
              table.getColumn('status')?.setFilterValue($event)
            "
          >
            In Progress
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            :checked="
              table.getColumn('status')?.getFilterValue() === 'finished'
            "
            @update:model-value="
              table.getColumn('status')?.setFilterValue($event)
            "
          >
            Vorbei
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

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
  </div>
</template>
