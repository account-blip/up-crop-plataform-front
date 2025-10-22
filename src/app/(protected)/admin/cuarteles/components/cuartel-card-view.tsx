"use client"

import type { Cuartel } from "@/types/cuartel.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin } from "lucide-react"

interface CuartelCardViewProps {
  cuarteles: Cuartel[]
  onSelectCuartel: (cuartel: Cuartel) => void
}

export function CuartelCardView({ cuarteles, onSelectCuartel }: CuartelCardViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cuarteles.map((cuartel) => (
        <Card
          key={cuartel.id}
          className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
          onClick={() => onSelectCuartel(cuartel)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {cuartel.nombre}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Empresa:</span>
              </div>
              <Badge variant="secondary" className="font-normal">
                {cuartel.unidadesProductiva?.empresa?.nombre ?? "—"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Unidad Productiva:</span>
              </div>
              <Badge variant="outline" className="font-normal">
                {cuartel.unidadesProductiva?.nombre ?? "—"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
