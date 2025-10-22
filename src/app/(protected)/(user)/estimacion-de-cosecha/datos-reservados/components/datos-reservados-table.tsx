"use client"

import { GlobalTable } from "@/components/table"
import { UnidadProductiva } from "@/types/unidad-productiva.type"
import { Cuartel } from "@/types/cuartel.type"
import { datosReservadoColumns } from "./datos-reservado-columns"
import { EstimacionDeCosecha } from "@/types/estimacion-de-cosecha.type"
import { Variedad } from "@/types/variedad.type"
import { Portainjerto } from "@/types/portainjerto.type"


export default function DatosReservadosTable({
  estimacionDeCosecha,
  unidadesProductivas,
  cuarteles,
  variedades,
  portainjertos,
}: {
  estimacionDeCosecha: EstimacionDeCosecha[];
  unidadesProductivas: UnidadProductiva[];
  cuarteles: Cuartel[];
  variedades: Variedad[];
  portainjertos: Portainjerto[];
}) {
  return (
    <GlobalTable
      columns={datosReservadoColumns(unidadesProductivas || [], cuarteles || [], variedades || [], portainjertos || [])}
      variedades={variedades}
      unidadesProductivas={unidadesProductivas}
      data={estimacionDeCosecha || []}
      filter="unidadesProductiva"
      rolUser={true}
    />
  )
}
