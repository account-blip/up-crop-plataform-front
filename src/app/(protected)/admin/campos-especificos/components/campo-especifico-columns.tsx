"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CampoEspecifico } from "@/types/campo-especifico.type"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { UpdateCampoEspecificoDialog } from "./update-campo-especifico-dialog"
import { DeleteCampoEspecificoDialog } from "./delete-campo-especifico-dialog"
import { Campo } from "@/types/campo.type"

export const campoEspecificoColumns = (campos: Campo[]): ColumnDef<CampoEspecifico>[] => [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "campo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campo" />
    ),
    cell: ({ row }) => {
      const campo = row.original.campo
      return (
        <div className="min-w-[100px] text-sm">
          {campo ? campo.nombre : "—"}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const campoEspecifico = row.original

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
            <UpdateCampoEspecificoDialog campoEspecifico={campoEspecifico} campos={campos} />
            <DeleteCampoEspecificoDialog campoEspecifico={campoEspecifico} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
