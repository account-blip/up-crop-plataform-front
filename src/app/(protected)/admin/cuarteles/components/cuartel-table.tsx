"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { cuartelColumns } from "./cuartel-columns"
import type { Cuartel } from "@/types/cuartel.type"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Table2 } from "lucide-react"
import { CuartelCardView } from "./cuartel-card-view"
import { CuartelDetailPanel } from "./cuartel-detail-panel"

interface CuartelTableProps {
  cuarteles: Cuartel[]
  unidadesProductivas: UnidadProductiva[]
}

export default function CuartelTable({ cuarteles, unidadesProductivas }: CuartelTableProps) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [selectedCuartel, setSelectedCuartel] = useState<Cuartel | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
            <Table2 className="h-4 w-4 mr-2" />
            Tabla
          </Button>
          <Button variant={viewMode === "cards" ? "default" : "outline"} size="sm" onClick={() => setViewMode("cards")}>
            <LayoutGrid className="h-4 w-4 mr-2" />
            Tarjetas
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className={selectedCuartel ? "flex-1" : "w-full"}>
          {viewMode === "table" ? (
            <DataTable
              columns={cuartelColumns(unidadesProductivas, setSelectedCuartel)}
              data={cuarteles}
              filter="nombre"
            />
          ) : (
            <CuartelCardView cuarteles={cuarteles} onSelectCuartel={setSelectedCuartel} />
          )}
        </div>

        {selectedCuartel && (
          <CuartelDetailPanel
            cuartel={selectedCuartel}
            onClose={() => setSelectedCuartel(null)}
            unidadesProductivas={unidadesProductivas}
          />
        )}
      </div>
    </div>
  )
}
