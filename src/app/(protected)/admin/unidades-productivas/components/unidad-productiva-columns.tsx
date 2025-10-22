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
import { ChevronDown, ChevronRight, MapPin, MoreHorizontal } from "lucide-react"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import type { Empresa } from "@/types/empresa.type"
import { UpdateUnidadProductivaDialog } from "./update-unidad-productiva-dialog"
import { DeleteUnidadProductivaDialog } from "./delete-unidad-productiva-dialog"

// ✅ --- CUARTELES ---
function CuartelesRow({ cuarteles }: { cuarteles: any[] }) {
  if (!cuarteles || cuarteles.length === 0) {
    return (
      <div className="pl-16 py-2 text-sm text-muted-foreground italic">
        No hay cuarteles registrados
      </div>
    )
  }

  return (
    <div className="pl-16 space-y-1">
      {cuarteles.map((cuartel) => (
        <div
          key={cuartel.id}
          className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted/20 border border-border"
        >
          <MapPin className="h-3.5 w-3.5 text-primary/60" />
          <span className="text-sm text-foreground/80">{cuartel.nombre}</span>
        </div>
      ))}
    </div>
  )
}

// ✅ --- COLUMNAS ---
export const unidadProductivaColumnsExpandable = (
  empresas: Empresa[]
): ColumnDef<UnidadProductiva>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const unidad = row.original
      const hasCuarteles = unidad.cuarteles && unidad.cuarteles.length > 0

      return (
        <button
          onClick={() => row.toggleExpanded()}
          disabled={!hasCuarteles}
          className="flex items-center justify-center w-8 h-8 disabled:opacity-30"
        >
          {hasCuarteles ? (
            row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4 text-primary" />
            ) : (
              <ChevronRight className="h-4 w-4 text-primary" />
            )
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
          )}
        </button>
      )
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const cuartelesCount = row.original.cuarteles?.length || 0

      return (
        <div className="flex items-center gap-3">
          <div className="min-w-[100px]">
            <div className="text-sm font-medium text-foreground">
              {row.getValue("nombre")}
            </div>
            {cuartelesCount > 0 && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {cuartelesCount}{" "}
                {cuartelesCount === 1 ? "cuartel" : "cuarteles"}
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      const empresa = row.original.empresa
      return (
        <div className="min-w-[100px] text-sm">
          {empresa ? empresa.nombre : "—"}
        </div>
      )
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
            <UpdateUnidadProductivaDialog
              unidadProductiva={unidadProductiva}
              empresas={empresas}
            />
            <DeleteUnidadProductivaDialog
              unidadProductiva={unidadProductiva}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// ✅ --- SUB COMPONENTE ---
export function renderUnidadProductivaSubComponent({ row }: { row: any }) {
  const unidad = row.original

  if (!unidad.cuarteles || unidad.cuarteles.length === 0) {
    return (
      <div className="py-4 px-6 text-sm text-muted-foreground italic">
        No hay cuarteles registrados para esta unidad productiva
      </div>
    )
  }

  return (
    <div className="space-y-2 bg-muted/5 border-t border-border p-4">
      <CuartelesRow cuarteles={unidad.cuarteles} />
    </div>
  )
}
