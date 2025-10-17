"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Cuartel } from "@/types/cuartel.type"
import { UpdateCuartelDialog } from "./update-cuartel-dialog"
import { DeleteCuartelDialog } from "./delete-cuartel-dialog"
import { CampoEspecifico } from "@/types/campo-especifico.type"

export const cuartelColumns = (camposEspecificos: CampoEspecifico[]): ColumnDef<Cuartel>[] => [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "campoEspecifico.campo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campo" />
    ),
    cell: ({ row }) => {
      const campo = row.original.campoEspecifico?.campo
      return (
        <div className="min-w-[100px] text-sm">
          {campo?.nombre ?? "—"}
        </div>
      )
    },
  },
  {
    accessorKey: "campoEspecifico",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campo Especifico" />
    ),
    cell: ({ row }) => {
      const camposEspecificos = row.original.campoEspecifico
      return (
        <div className="min-w-[100px] text-sm">
          {camposEspecificos ? camposEspecificos.nombre : "—"}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cuartel = row.original

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
            <UpdateCuartelDialog cuartel={cuartel} camposEspecificos={camposEspecificos}/>
            <DeleteCuartelDialog cuartel={cuartel} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
