// 📄 components/CampoEspecificoTable.tsx
"use client"

import { GlobalTable } from "@/components/table"
import { CampoEspecifico } from "@/types/campo-especifico.type"
import { Cuartel } from "@/types/cuartel.type"
import { cuartelColumns } from "./cuartel-columns"

export default function CuartelTable({
  cuarteles,
  camposEspecificos,
}: {
  cuarteles?: Cuartel[]
  camposEspecificos?: CampoEspecifico[]
}) {
  return (
    <GlobalTable
      columns={cuartelColumns(camposEspecificos || [])}
      data={cuarteles || []}
      filter="nombre"
    />
  )
}
