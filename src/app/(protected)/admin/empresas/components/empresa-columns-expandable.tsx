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
import { ChevronDown, ChevronRight, MoreHorizontal, Building2, MapPin } from "lucide-react"
import { UpdateEmpresaDialog } from "./update-empresa-dialog"
import { DeleteEmpresaDialog } from "./delete-empresa-dialog"
import type { Empresa } from "@/types/empresa.type"
import { useState } from "react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

// ✅ --- CUARTELES ---
function CuartelesRow({ cuarteles }: { cuarteles: any[] }) {
  if (!cuarteles || cuarteles.length === 0) {
    return <div className="pl-16 py-2 text-sm text-muted-foreground italic">No hay cuarteles registrados</div>
  }

  return (
    <div className="pl-16 space-y-1">
      {cuarteles.map((cuartel) => (
        <div key={cuartel.id} className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted/20 border border-border">
          <MapPin className="h-3.5 w-3.5 text-primary/60" />
          <span className="text-sm text-foreground/80">{cuartel.nombre}</span>
        </div>
      ))}
    </div>
  )
}

// ✅ --- UNIDADES ---
function UnidadProductivaRow({ unidad }: { unidad: any }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-l-2 border-primary/20 ml-6">
      <div
        className="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-muted/30 rounded-md transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-primary" />
        ) : (
          <ChevronRight className="h-4 w-4 text-primary" />
        )}
        <Building2 className="h-4 w-4 text-primary/70" />
        <span className="text-sm font-medium text-foreground">{unidad.nombre}</span>
        <span className="text-xs text-muted-foreground ml-2">({unidad.cuarteles?.length || 0} cuarteles)</span>
      </div>
      {isExpanded && (
        <div className="mt-1 mb-2">
          <CuartelesRow cuarteles={unidad.cuarteles || []} />
        </div>
      )}
    </div>
  )
}

// ✅ --- EXPANDIDO ---
function UnidadesProductivasExpanded({ empresa }: { empresa: Empresa }) {
  if (!empresa.unidadesProductiva || empresa.unidadesProductiva.length === 0) {
    return (
      <div className="py-4 px-6 text-sm text-muted-foreground italic">
        No hay unidades productivas registradas para esta empresa
      </div>
    )
  }

  return (
    <div className="py-3 px-6 space-y-2 bg-muted/20">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Unidades Productivas ({empresa.unidadesProductiva.length})
      </div>
      {empresa.unidadesProductiva.map((unidad) => (
        <UnidadProductivaRow key={unidad.id} unidad={unidad} />
      ))}
    </div>
  )
}

// ✅ --- COLUMNAS ---
export const empresaColumnsExpandable: ColumnDef<Empresa>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const empresa = row.original
      const hasUnidades = empresa.unidadesProductiva && empresa.unidadesProductiva.length > 0

      return (
        <button
        onClick={() => row.toggleExpanded()}
          disabled={!hasUnidades}
          className="flex items-center justify-center w-8 h-8 disabled:opacity-30"
        >
          {hasUnidades ? (
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => {
      const empresa = row.original
      const unidadesCount = empresa.unidadesProductiva?.length || 0
      const cuartelesCount =
        empresa.unidadesProductiva?.reduce((acc, up) => acc + (up.cuarteles?.length || 0), 0) || 0

      return (
        <div className="flex items-center gap-3">
          <div className="min-w-[100px]">
            <div className="text-sm font-medium text-foreground">{row.getValue("nombre")}</div>
            {unidadesCount > 0 && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {unidadesCount} {unidadesCount === 1 ? "unidad" : "unidades"} · {cuartelesCount}{" "}
                {cuartelesCount === 1 ? "cuartel" : "cuarteles"}
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const empresa = row.original

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
            <UpdateEmpresaDialog empresa={empresa} />
            <DeleteEmpresaDialog empresa={empresa} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
export function renderSubComponent({ row }: { row: any }) {
    const empresa = row.original
  
    // 🟡 Caso sin unidades productivas
    if (!empresa.unidadesProductiva || empresa.unidadesProductiva.length === 0) {
      return (
        <div className="py-4 px-6 text-sm text-muted-foreground italic">
          No hay unidades productivas registradas para esta empresa
        </div>
      )
    }
  
    // 🟢 Caso con unidades productivas
    return (
      <div className="space-y-2 bg-muted/5 border-t border-border p-4">
        {empresa.unidadesProductiva.map((unidad: any) => (
          <UnidadProductivaRow key={unidad.id} unidad={unidad} />
        ))}
      </div>
    )
  }
  
  
  