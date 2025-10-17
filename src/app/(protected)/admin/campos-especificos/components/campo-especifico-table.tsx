// 📄 components/CampoEspecificoTable.tsx
"use client"

import { GlobalTable } from "@/components/table"
import { campoEspecificoColumns } from "./campo-especifico-columns"
import { CampoEspecifico } from "@/types/campo-especifico.type"
import { Campo } from "@/types/campo.type"

export default function CampoEspecificoTable({
  campos,
  camposEspecificos,
}: {
  campos?: Campo[]
  camposEspecificos?: CampoEspecifico[]
}) {
  return (
    <GlobalTable
      columns={campoEspecificoColumns(campos || [])}
      data={camposEspecificos || []}
      filter="nombre"
    />
  )
}
