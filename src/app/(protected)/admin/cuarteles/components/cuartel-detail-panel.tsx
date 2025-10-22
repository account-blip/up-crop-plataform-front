"use client"

import type { Cuartel } from "@/types/cuartel.type"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Building2, MapPin, Calendar } from "lucide-react"
import { UpdateCuartelDialog } from "./update-cuartel-dialog"
import { DeleteCuartelDialog } from "./delete-cuartel-dialog"

interface CuartelDetailPanelProps {
  cuartel: Cuartel
  onClose: () => void
  unidadesProductivas: UnidadProductiva[]
}

export function CuartelDetailPanel({ cuartel, onClose, unidadesProductivas }: CuartelDetailPanelProps) {
  return (
    <Card className="w-80 flex-shrink-0 animate-in slide-in-from-right">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Detalles del Cuartel</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{cuartel.nombre}</h3>
          <p className="text-sm text-muted-foreground">ID: {cuartel.id}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Empresa</p>
              <Badge variant="secondary">{cuartel.unidadesProductiva?.empresa?.nombre ?? "—"}</Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Unidad Productiva</p>
              <Badge variant="outline">{cuartel.unidadesProductiva?.nombre ?? "—"}</Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Fecha de Creación</p>
              <p className="text-sm text-muted-foreground">
                {new Date(cuartel.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Última Actualización</p>
              <p className="text-sm text-muted-foreground">
                {new Date(cuartel.updatedAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <UpdateCuartelDialog cuartel={cuartel} unidadesProductivas={unidadesProductivas} />
          <DeleteCuartelDialog cuartel={cuartel} />
        </div>
      </CardContent>
    </Card>
  )
}
