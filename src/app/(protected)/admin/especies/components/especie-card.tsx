"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Variedad } from "@/types/variedad.type"
import { MoreVertical, Sparkles } from "lucide-react"
import { Especie } from "@/types/especie.type"
import { UpdateEspecieDialog } from "./update-especie-dialog"
import { DeleteEspecieDialog } from "./delete-especie-dialog"

interface EspecieCardProps {
  especie: Especie
  viewMode: "grid" | "list"
}

// Generate a consistent color based on the variedad name
function getEspecieColor(nombre: string): string {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-green-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
  ]

  const hash = nombre.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export function EspecieCard({ especie, viewMode }: EspecieCardProps) {
  const gradientColor = getEspecieColor(especie.nombre)

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="flex items-center gap-4 p-4">
          <div
            className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center`}
          >
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">{especie.nombre}</h3>
            <p className="text-sm text-muted-foreground">Especie</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
              <UpdateEspecieDialog especie={especie} />
              <DeleteEspecieDialog especie={especie} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Gradient Header */}
        <div
          className={`h-32 bg-gradient-to-br ${gradientColor} flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <Sparkles className="h-16 w-16 text-white relative z-10 drop-shadow-lg" />
        </div>

        {/* Actions Menu */}
        <div className="absolute top-2 right-2 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                <span className="sr-only">Abrir menú</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
              <UpdateEspecieDialog especie={especie} />
              <DeleteEspecieDialog especie={especie} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground truncate mb-1">{especie.nombre}</h3>
          <p className="text-xs text-muted-foreground">Especie</p>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>ID: {especie.id.slice(0, 8)}</span>
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Activa</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
