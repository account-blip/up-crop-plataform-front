"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import type { Empresa } from "@/types/empresa.type"
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { UpdateUnidadProductivaDialog } from "./update-unidad-productiva-dialog"
import { DeleteUnidadProductivaDialog } from "./delete-unidad-productiva-dialog"

export const unidadProductivaColumnsExpandable = (empresas: Empresa[]): ColumnDef<UnidadProductiva>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const cuarteles = row.original.cuarteles || []

      if (cuarteles.length === 0) {
        return <div className="w-8" />
      }

      return (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => row.toggleExpanded()}>
          <ChevronRight className={`h-4 w-4 transition-transform ${row.getIsExpanded() ? "rotate-90" : ""}`} />
        </Button>
      )
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => {
      const cuarteles = row.original.cuarteles || []

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => row.toggleExpanded()}
            className="min-w-[150px] text-left text-sm font-medium hover:text-primary transition-colors"
          >
            {row.getValue("nombre")}
          </button>
          {cuarteles.length > 0 && (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {cuarteles.length} {cuarteles.length === 1 ? "cuartel" : "cuarteles"}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
    cell: ({ row }) => {
      const empresa = row.original.empresa
      return <div className="min-w-[100px] text-sm">{empresa ? empresa.nombre : "—"}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unidadProductiva = row.original

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
            <UpdateUnidadProductivaDialog unidadProductiva={unidadProductiva} empresas={empresas} />
            <DeleteUnidadProductivaDialog unidadProductiva={unidadProductiva} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Función para renderizar las filas expandidas de cuarteles
export function renderUnidadProductivaSubRow({ row }: { row: any }) {
    const unidadProductiva: UnidadProductiva = row.original
    const cuarteles = unidadProductiva.cuarteles || []
  
    if (cuarteles.length === 0) {
      return (
        <div className="py-4 px-6 text-sm text-muted-foreground italic">
          No hay cuarteles registrados para esta unidad productiva
        </div>
      )
    }
  
    return (
      <div className="space-y-2 bg-muted/5 border-t border-border p-4">
        {cuarteles.map((cuartel) => (
          <div
            key={cuartel.id}
            className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted/20 border border-border"
          >
            <span className="text-sm text-foreground/80">{cuartel.nombre}</span>
          </div>
        ))}
      </div>
    )
  }
  
  
