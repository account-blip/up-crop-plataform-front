"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Campo } from "@/types/campo.type"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { UpdateCampoDialog } from "./update-campo-dialog"
import { DeleteCampoDialog } from "./delete-campo-dialog"

export const campoColumns: ColumnDef<Campo>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("nombre")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const campo = row.original

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
            <UpdateCampoDialog campo={campo} />
            <DeleteCampoDialog campo={campo} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
