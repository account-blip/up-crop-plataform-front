"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Grid3x3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Especie } from "@/types/especie.type"
import { EspecieCard } from "./especie-card"

interface EspecieCatalogProps {
  especies: Especie[]
}

export function EspecieCatalog({ especies }: EspecieCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredEspecies = especies.filter((especie) =>
    especie.nombre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar especies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {filteredEspecies.length} {filteredEspecies.length === 1 ? "especie" : "especies"}
        </span>
        {searchQuery && <span className="text-primary">Filtrando por: "{searchQuery}"</span>}
      </div>

      {/* Catalog Grid/List */}
      {filteredEspecies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Sparkles className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No se encontraron especies</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {searchQuery ? "Intenta con otro término de búsqueda" : "Comienza agregando tu primera variedad"}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredEspecies.map((especie) => (
            <EspecieCard key={especie.id} especie={especie} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
