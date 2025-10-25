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
import { ChevronDown, ChevronRight, ClipboardCheck, MoreHorizontal, Palette, Ruler } from "lucide-react"
import { AnalisisDeCalidad } from "@/types/analisis-de-calidad/analisis-de-calidad.type"

export const analisisDeCalidadColumnsExpandable = (): ColumnDef<AnalisisDeCalidad>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const analisis = row.original
      const hasCalibres = analisis.calibres && analisis.calibres.length > 0
      const hasColores = analisis.colores && analisis.colores.length > 0
      const hasControlCalidad =
        analisis.controlesCalidad && analisis.controlesCalidad.length > 0
  
      const hasRelatedData = hasCalibres || hasColores || hasControlCalidad
  
      return (
        <button
          onClick={() => row.toggleExpanded()}
          disabled={!hasRelatedData}
          className="flex items-center justify-center w-8 h-8 disabled:opacity-30"
        >
          {hasRelatedData ? (
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
    accessorKey: "fecha",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("fecha") as string
      const formattedDate = new Date(rawDate).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
  
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => row.toggleExpanded()}
            className="min-w-[150px] text-left text-sm font-medium hover:text-primary transition-colors"
          >
            {formattedDate}
          </button>
        </div>
      )
    },
  },
  
  {
    accessorKey: "variedad",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Variedad" />,
    cell: ({ row }) => {
      const variedad = row.original.variedad
      return <div className="min-w-[100px] text-sm">{variedad ? variedad.nombre : "—"}</div>
    },
  },
  {
    accessorKey: "cuartel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cuartel" />,
    cell: ({ row }) => {
      const cuartel = row.original.cuartel
      return <div className="min-w-[100px] text-sm">{cuartel ? cuartel.nombre : "—"}</div>
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
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Función para renderizar las filas expandidas de cuarteles
export function renderAnalisisSubRow({ row }: { row: any }) {
  const analisis: AnalisisDeCalidad = row.original
  const calibres = analisis.calibres || []
  const colores = analisis.colores || []
  const controles = analisis.controlesCalidad || []

  const noData =
    calibres.length === 0 &&
    colores.length === 0 &&
    controles.length === 0

  if (noData) {
    return (
      <div className="py-4 px-6 text-sm text-muted-foreground italic">
        No hay información registrada para este análisis
      </div>
    )
  }

  return (
    <div className="space-y-4 bg-muted/5 border-t border-border p-4 rounded-b-md">
      {/* ================= Calibres ================= */}
      {calibres.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Calibres</h4>
          </div>
          <div className="space-y-1">
            {calibres.map((calibre) => (
              <div
                key={calibre.id}
                className="flex justify-between items-center text-sm bg-muted/20 rounded-md px-3 py-2 border border-border"
              >
                <span>{calibre.calibre}</span>
                <div className="flex gap-3 text-muted-foreground text-xs">
                  <span>{calibre.cantidad} u.</span>
                  {calibre.porcentaje !== undefined && (
                    <span>{calibre.porcentaje}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= Colores ================= */}
      {colores.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Colores</h4>
          </div>
          <div className="space-y-1">
            {colores.map((color) => (
              <div
                key={color.id}
                className="flex justify-between items-center text-sm bg-muted/20 rounded-md px-3 py-2 border border-border"
              >
                <span>{color.color}</span>
                <div className="flex gap-3 text-muted-foreground text-xs">
                  <span>{color.cantidad} u.</span>
                  {color.porcentaje !== undefined && (
                    <span>{color.porcentaje}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

{/* ================= Control de Calidad ================= */}
{controles.length > 0 && (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <ClipboardCheck className="h-4 w-4 text-primary" />
      <h4 className="text-sm font-semibold text-foreground">
        Control de Calidad
      </h4>
    </div>

    <div className="space-y-2">
      {controles.map((ctrl) => {
const defectosCalidad = ctrl.defectosAsignados?.filter(
  (a) => a.defecto?.tipo === 'CALIDAD'
) || [];

const defectosCondicion = ctrl.defectosAsignados?.filter(
  (a) => a.defecto?.tipo === 'CONDICION'
) || [];


        return (
          <details
            key={ctrl.id}
            className="group rounded-md border border-border bg-muted/20 overflow-hidden"
          >
            <summary className="cursor-pointer flex justify-between items-center px-3 py-2 font-medium text-sm hover:bg-muted/40">
              <span>Tipo: {ctrl.tipo}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>

            <div className="p-3 space-y-3 border-t border-border bg-muted/30">
              {/* Defectos de Calidad */}
              <div>
                <span className="block text-xs font-semibold mb-1 text-foreground/80">
                  Defectos de Calidad:
                </span>
                <div className="flex flex-wrap gap-2">
                  {defectosCalidad.length > 0 ? (
                    defectosCalidad.map((asignado) => (
                      <div
                        key={asignado.id}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                      >
                        <span>{asignado.defecto.nombre}</span>
                        <span className="text-[11px] text-foreground/80">
                          ({asignado.porcentaje} %)
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Sin defectos de calidad
                    </span>
                  )}
                </div>
              </div>

              {/* Defectos de Condición */}
              <div>
                <span className="block text-xs font-semibold mb-1 text-foreground/80">
                  Defectos de Condición:
                </span>
                <div className="flex flex-wrap gap-2">
                  {defectosCondicion.length > 0 ? (
                    defectosCondicion.map((asignado) => (
                      <div
                        key={asignado.id}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs"
                      >
                        <span>{asignado.defecto.nombre}</span>
                        <span className="text-[11px] text-foreground/80">
                          ({asignado.porcentaje} %)
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Sin defectos de condición
                    </span>
                  )}
                </div>
              </div>

            </div>
          </details>
        );
      })}
    </div>
  </div>
)}

    </div>
  )
}
  
  
