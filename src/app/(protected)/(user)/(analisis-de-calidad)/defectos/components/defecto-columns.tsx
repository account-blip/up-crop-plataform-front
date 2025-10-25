"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Defecto } from "@/types/analisis-de-calidad/defecto.type"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { UpdateDefectoDialog } from "./update-defecto-dialog"
import { DeleteDefectoDialog } from "./delete-defecto-dialog"

export const defectoColumns: ColumnDef<Defecto>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("tipo")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const defecto = row.original

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
            <UpdateDefectoDialog defecto={defecto} />
            <DeleteDefectoDialog defecto={defecto} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
