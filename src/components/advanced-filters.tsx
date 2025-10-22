"use client"

import { useState } from "react"
import type { Table } from "@tanstack/react-table"
import { CalendarIcon, Filter, X, ChevronDown, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type EstadoType, ESTADO_TYPE } from "@/types/estimacion-de-cosecha.type"
import { Variedad } from "@/types/variedad.type"
import { UnidadProductiva } from "@/types/unidad-productiva.type"

interface AdvancedFiltersProps<TData> {
  table: Table<TData>
  estados?: EstadoType[]
  variedades?: Variedad[]
  unidadesProductivas?: UnidadProductiva[]
}

export function AdvancedFilters<TData>({
  table,
  estados = [...ESTADO_TYPE],
  variedades = [],
  unidadesProductivas = [],
}: AdvancedFiltersProps<TData>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedEstado, setSelectedEstado] = useState<string>("")
  const [selectedVariedad, setSelectedVariedad] = useState<string>("")
  const [selectedCampo, setSelectedCampo] = useState<string>("")

  const activeFiltersCount =
    (selectedDate ? 1 : 0) +
    (selectedEstado ? 1 : 0) +
    (selectedVariedad ? 1 : 0) +
    (selectedCampo ? 1 : 0)

  const handleEstadoChange = (value: string) => {
    const next = value === "all" ? "" : value
    setSelectedEstado(next)
    table.getColumn("estado")?.setFilterValue(next)
  }

  const handleVariedadChange = (value: string) => {
    const next = value === "all" ? "" : value
    setSelectedVariedad(next)
    table.getColumn("variedad")?.setFilterValue(next)
  }

  const handleCampoChange = (value: string) => {
    const next = value === "all" ? "" : value
    setSelectedCampo(next)
    table.getColumn("campoEspecifico")?.setFilterValue(next)
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      // Filtramos por YYYY-MM-DD
      const formatted = date.toISOString().slice(0, 10)
      table.getColumn("createdAt")?.setFilterValue(formatted)
    } else {
      table.getColumn("createdAt")?.setFilterValue("")
    }
  }

  const clearAllFilters = () => {
    setSelectedDate(undefined)
    setSelectedEstado("")
    setSelectedVariedad("")
    setSelectedCampo("")
    table.getColumn("estado")?.setFilterValue("")
    table.getColumn("variedad")?.setFilterValue("")
    table.getColumn("campoEspecifico")?.setFilterValue("")
    table.getColumn("createdAt")?.setFilterValue("")
  }

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "relative overflow-hidden border-2 transition-all duration-300",
            isExpanded ? "border-[#4166f5] bg-[#4166f5]/5 text-[#4166f5]" : "border-border hover:border-[#4166f5]/50"
          )}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros Avanzados
          <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")} />
          {activeFiltersCount > 0 && (
            <Badge
              variant="default"
              className="ml-2 h-5 w-5 rounded-full bg-[#4166f5] p-0 text-xs flex items-center justify-center animate-in zoom-in-50"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      

      {/* Filters Panel */}
      {isExpanded && (
        <div className="grid gap-4 rounded-xl border-2 border-[#4166f5]/20 bg-gradient-to-br from-[#4166f5]/5 via-transparent to-purple-500/5 p-6 shadow-lg shadow-[#4166f5]/10 animate-in slide-in-from-top-4 fade-in-50 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-[#4166f5]" />
            <h3 className="font-semibold text-lg">Filtros Personalizados</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Fecha Exacta */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#4166f5]" />
                Fecha
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-45 justify-start text-left font-normal transition-all duration-200",
                      !selectedDate && "text-muted-foreground",
                      selectedDate && "border-[#4166f5] bg-[#4166f5]/5"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
              {selectedDate && (
                <Badge
                  variant="secondary"
                  className="w-full justify-between bg-[#4166f5]/10 text-[#4166f5] hover:bg-[#4166f5]/20"
                >
                  {format(selectedDate, "dd/MM/yyyy")}
                  <button
                    type="button"
                    aria-label="Quitar filtro de fecha"
                    className="p-0 m-0 h-4 w-4 inline-flex items-center justify-center rounded hover:text-destructive"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDateChange(undefined)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                Estado
              </label>
              <Select value={selectedEstado} onValueChange={handleEstadoChange}>
                <SelectTrigger className={cn("transition-all duration-200", selectedEstado && "border-green-500 bg-green-500/5")}>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedEstado && selectedEstado !== "all" && (
                <Badge
                  variant="secondary"
                  className="w-full justify-between bg-green-500/10 text-green-600 hover:bg-green-500/20"
                >
                  {selectedEstado}
                  <button
                    type="button"
                    aria-label="Quitar filtro de estado"
                    className="p-0 m-0 h-4 w-4 inline-flex items-center justify-center rounded hover:text-destructive"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEstadoChange("all")
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>

            {/* Variedad */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                Variedad
              </label>
              <Select value={selectedVariedad} onValueChange={handleVariedadChange}>
                <SelectTrigger className={cn("transition-all duration-200", selectedVariedad && "border-amber-500 bg-amber-500/5")}>
                  <SelectValue placeholder="Todas las variedades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las variedades</SelectItem>
                  {variedades.map((variedad) => (
                    <SelectItem key={variedad.id} value={variedad.nombre}>
                      {variedad.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedVariedad && selectedVariedad !== "all" && (
                <Badge
                  variant="secondary"
                  className="w-full justify-between bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                >
                  {selectedVariedad}
                  <button
                    type="button"
                    aria-label="Quitar filtro de variedad"
                    className="p-0 m-0 h-4 w-4 inline-flex items-center justify-center rounded hover:text-destructive"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVariedadChange("all")
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>

            {/* Campo Específico */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
                Campo Específico
              </label>
              <Select value={selectedCampo} onValueChange={handleCampoChange}>
                <SelectTrigger className={cn("transition-all duration-200", selectedCampo && "border-cyan-500 bg-cyan-500/5")}>
                  <SelectValue placeholder="Todos los campos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los campos</SelectItem>
                  {unidadesProductivas.map((campo) => (
                    <SelectItem key={campo.id} value={campo.nombre}>
                      {campo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCampo && selectedCampo !== "all" && (
                <Badge
                  variant="secondary"
                  className="w-full justify-between bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20"
                >
                  {selectedCampo}
                  <button
                    type="button"
                    aria-label="Quitar filtro de campo"
                    className="p-0 m-0 h-4 w-4 inline-flex items-center justify-center rounded hover:text-destructive"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCampoChange("all")
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-[#4166f5]/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {activeFiltersCount} {activeFiltersCount === 1 ? "filtro activo" : "filtros activos"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="mr-1 h-4 w-4" />
                  Limpiar todos
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
