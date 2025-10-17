// 📄 components/CampoEspecificoTable.tsx
"use client"

import { GlobalTable } from "@/components/table"
import { CampoEspecifico } from "@/types/campo-especifico.type"
import { Cuartel } from "@/types/cuartel.type"
import { datosReservadoColumns } from "./datos-reservado-columns"
import { EstimacionDeCosecha } from "@/types/estimacion-de-cosecha.type"
import { Variedad } from "@/types/variedad.type"
import { Portainjerto } from "@/types/portainjerto.type"


export default function DatosReservadosTable({
  estimacionDeCosecha,
  camposEspecificos,
  cuarteles,
  variedades,
  portainjertos,
}: {
  estimacionDeCosecha: EstimacionDeCosecha[];
  camposEspecificos: CampoEspecifico[];
  cuarteles: Cuartel[];
  variedades: Variedad[];
  portainjertos: Portainjerto[];
}) {
  return (
    <GlobalTable
      columns={datosReservadoColumns(camposEspecificos || [], cuarteles || [], variedades || [], portainjertos || [])}
      variedades={variedades}
      camposEspecificos={camposEspecificos}
      data={estimacionDeCosecha || []}
      filter="campoEspecifico"
      rolUser={true}
    />
  )
}
