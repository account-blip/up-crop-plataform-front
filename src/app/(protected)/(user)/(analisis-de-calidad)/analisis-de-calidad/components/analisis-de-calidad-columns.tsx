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
import {
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  MoreHorizontal,
  Palette,
  Ruler,
} from "lucide-react"
import { AnalisisDeCalidad } from "@/types/analisis-de-calidad/analisis-de-calidad.type"
import { EtapaInspeccion } from "@/types/analisis-de-calidad/etapa-inspeccion.type"
import { Cuartel } from "@/types/cuartel.type"
import { UnidadInspeccion } from "@/types/analisis-de-calidad/unidad-inspeccion.type"
import { Especie } from "@/types/especie.type"
import { Defecto } from "@/types/analisis-de-calidad/defecto.type"
import { UpdateAnalisisDeCalidadDialog } from "./update-analisis-de-calidad-dialog"
import { DeleteAnalisisDeCalidadDialog } from "./delete-analisis-de-calidad-dialog"

export const analisisDeCalidadColumnsExpandable = ({ etapas, cuarteles, unidades, especies, defectos }: { etapas: EtapaInspeccion[], cuarteles: Cuartel[], unidades: UnidadInspeccion[], especies: Especie[], defectos: Defecto[] }): ColumnDef<AnalisisDeCalidad>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const analisis = row.original
      const hasUnits = analisis.unidadesInspeccion?.length > 0
      return (
        <button
          onClick={() => row.toggleExpanded()}
          disabled={!hasUnits}
          className="flex items-center justify-center w-8 h-8 disabled:opacity-30"
        >
          {hasUnits ? (
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
    cell: ({ row }) => {
      const rawDate = row.getValue("fecha")
      if (!rawDate) return <span className="text-muted-foreground">—</span>
  
      // Forzar a string en caso de que venga como objeto
      const parsed = new Date(typeof rawDate === "string" ? rawDate : String(rawDate))
  
      const formatted = !isNaN(parsed.getTime())
        ? parsed.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "—"
  
      return (
        <button
          onClick={() => row.toggleExpanded()}
          className="min-w-[100px] text-left text-sm font-medium hover:text-primary transition-colors"
        >
          {formatted}
        </button>
      )
    },
  }, 
  {
    accessorKey: "user",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Inspector" />,
    cell: ({ row }) => <span>{row.original.user?.firstName ?? "—"} {row.original.user?.lastName ?? "—"}</span>,
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
    cell: ({ row }) => <span>{row.original.empresa?.nombre ?? "—"}</span>,
  }, 
  {
    accessorKey: "cuartel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cuartel" />,
    cell: ({ row }) => <span>{row.original.cuartel?.nombre ?? "—"}</span>,
  },
  {
    accessorKey: "etapaInspeccion",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Etapa" />,
    cell: ({ row }) => <span>{row.original.etapaInspeccion?.nombre ?? "—"}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
          <UpdateAnalisisDeCalidadDialog analisisDeCalidad={row.original} etapas={etapas} cuarteles={cuarteles} unidades={unidades} especies={especies} defectos={defectos} />
          <DeleteAnalisisDeCalidadDialog analisisDeCalidad={row.original} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function renderAnalisisSubRow({ row }: { row: any }) {
  const analisis: AnalisisDeCalidad = row.original
  const unidades = analisis.unidadesInspeccion || []

  if (unidades.length === 0) {
    return (
      <div className="py-4 px-6 text-sm text-muted-foreground italic">
        No hay unidades registradas
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-muted/5 border-t border-border p-4 rounded-b-md">
      {/* ================= UNIVERSO MUESTRA ================= */}
      <div className="flex items-center justify-between p-3 border border-border rounded-md bg-primary/5">
        <span className="text-sm font-semibold text-primary">
          Universo Muestra:
        </span>
        <span className="text-base font-bold text-foreground">
          {analisis.universoMuestra ?? "—"}
        </span>
      </div>

      {unidades.map((unidad) => (
        <div
          key={unidad.id}
          className="border border-border rounded-lg p-4 bg-background/60 shadow-sm"
        >
        <h4 className="font-semibold text-sm text-foreground mb-3">
          {unidad.unidadInspeccion?.nombre ?? "-"} #{unidad.indice ?? "—"} —{" "}
          {unidad.variedad?.nombre ?? "Sin variedad"} (
          {unidad.especie?.nombre ?? "Sin especie"})
        </h4>

          {/* ================= Calibres ================= */}
          {unidad.calibres?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Calibres</span>
            </div>
            <div className="space-y-1">
              {unidad.calibres.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between text-sm bg-muted/20 px-3 py-2 rounded-md border items-center"
                >
                  <span>{c.calibre}</span>
                  <div className="flex gap-3 items-center text-xs text-muted-foreground">
                    <span>{c.cantidad} u.</span>
                    <span
                      className={`font-semibold ${
                        Number(c.porcentaje ?? 0) >= 50
                          ? "text-green-500"
                          : Number(c.porcentaje ?? 0) >= 20
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {Number(c.porcentaje ?? 0).toFixed(2)}%
                    </span>


                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* ================= Colores ================= */}
{unidad.colores?.length > 0 && (
  <section className="mt-3">
    <div className="flex items-center gap-2 mb-2">
      <Palette className="h-4 w-4 text-primary" />
      <span className="text-sm font-semibold">Colores</span>
    </div>
    <div className="space-y-1">
      {unidad.colores.map((col) => (
        <div
          key={col.id}
          className="flex justify-between items-center text-sm bg-muted/20 px-3 py-2 rounded-md border"
        >
          <span>{col.color}</span>
          <div className="flex gap-3 items-center text-xs text-muted-foreground">
            <span>{col.cantidad} u.</span>
            <span
              className={`font-semibold ${
                Number(col.porcentaje ?? 0) >= 50
                  ? "text-green-500"
                  : Number(col.porcentaje ?? 0) >= 20
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {Number(col.porcentaje ?? 0).toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

          {unidad.controlesCalidad?.length > 0 && (
            <section className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Control de Calidad</span>
              </div>

              <div className="p-2 border border-border rounded-md bg-muted/20 space-y-3">
                {/* Defectos de Calidad */}
                <div>
                  <strong className="text-xs text-foreground/80">Defectos de Calidad:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {unidad.controlesCalidad
                      .flatMap(
                        (ctrl) =>
                          ctrl.defectosAsignados?.filter(
                            (a) => a.defecto?.tipo === "CALIDAD"
                          ) || []
                      )
                      .map((a) => (
                        <span
                          key={a.id}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {a.defecto.nombre} — {a.porcentaje?.toFixed(2) ?? 0}%
                        </span>
                      ))}
                  </div>
                </div>

                {/* Defectos de Condición */}
                <div>
                  <strong className="text-xs text-foreground/80">Defectos de Condición:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {unidad.controlesCalidad
                      .flatMap(
                        (ctrl) =>
                          ctrl.defectosAsignados?.filter(
                            (a) => a.defecto?.tipo === "CONDICION"
                          ) || []
                      )
                      .map((a) => (
                        <span
                          key={a.id}
                          className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium"
                        >
                          {a.defecto.nombre} — {a.porcentaje?.toFixed(2) ?? 0}%
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* ================= Temperatura y Brix ================= */}
{(unidad.temperaturaBins !== null && unidad.temperaturaBins !== undefined) ||
 (unidad.brix !== null && unidad.brix !== undefined) ? (
  <section className="mt-3">
    <div className="flex items-center gap-2 mb-2">
      <Ruler className="h-4 w-4 text-primary" />
      <span className="text-sm font-semibold">Temperatura & Brix</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-muted/20 px-3 py-2 rounded-md border">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Temperatura Bins:</span>
        <span className="font-semibold text-foreground">
          {unidad.temperaturaBins !== undefined && unidad.temperaturaBins !== null
            ? `${Number(unidad.temperaturaBins).toFixed(1)} °C`
            : "—"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Brix:</span>
        <span className="font-semibold text-foreground">
          {unidad.brix !== undefined && unidad.brix !== null
            ? `${Number(unidad.brix).toFixed(1)} °B`
            : "—"}
        </span>
      </div>
    </div>
  </section>
) : null}


        </div>
      ))}
    </div>
  )
}



