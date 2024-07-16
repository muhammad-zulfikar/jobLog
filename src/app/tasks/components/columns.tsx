"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableRowTitle } from "./data-table-row-title";
import { DataTableRowStatus } from "./data-table-row-status";
import { DataTableRowCompany } from "./data-table-row-company";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableRowURL from "./data-table-row-url";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="max-w-[150px]">
        <DataTableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({ row }) => <DataTableRowStatus row={row} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="max-w-[120px] md:max-w-[300px]">
        <DataTableColumnHeader column={column} title="Role" />
      </div>
    ),
    cell: ({ row }) => <DataTableRowTitle row={row} />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <div className="max-w-[120px] md:max-w-[300px]">
        <DataTableColumnHeader column={column} title="Company" />
      </div>
    ),
    cell: ({ row }) => <DataTableRowCompany row={row} />,
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <div className="max-w-[120px] md:max-w-[300px]">
        <DataTableColumnHeader column={column} title="URL" />
      </div>
    ),
    cell: ({ row }) => <DataTableRowURL row={row} />,
  },
];