"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import type { Cuartel } from "@/types/cuartel.type"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"

export const cuartelColumns = (
  unidadesProductivas: UnidadProductiva[],
  onSelectCuartel: (cuartel: Cuartel) => void,
): ColumnDef<Cuartel>[] => [
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => (
      <button
        onClick={() => onSelectCuartel(row.original)}
        className="min-w-[100px] text-sm text-left hover:text-primary transition-colors flex items-center gap-2 group"
      >
        <Eye className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        {row.getValue("nombre")}
      </button>
    ),
  },
  {
    accessorKey: "unidadesProductiva.empresa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
    cell: ({ row }) => {
      const empresa = row.original.unidadesProductiva?.empresa
      return <div className="min-w-[100px] text-sm">{empresa?.nombre ?? "—"}</div>
    },
  },
  {
    accessorKey: "unidadesProductiva",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unidad Productiva" />,
    cell: ({ row }) => {
      const unidadesProductivas = row.original.unidadesProductiva
      return <div className="min-w-[100px] text-sm">{unidadesProductivas ? unidadesProductivas.nombre : "—"}</div>
    },
  }
]
