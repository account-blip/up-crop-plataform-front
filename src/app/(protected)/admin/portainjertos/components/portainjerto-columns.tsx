"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Portainjerto } from "@/types/portainjerto.type"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { UpdatePortainjertoDialog } from "./update-portainjerto-dialog"
import { DeletePortainjertoDialog } from "./delete-portainjerto-dialog"

export const portainjertoColumns: ColumnDef<Portainjerto>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("nombre")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const portainjerto = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
            <UpdatePortainjertoDialog portainjerto={portainjerto} />
            <DeletePortainjertoDialog portainjerto={portainjerto} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
