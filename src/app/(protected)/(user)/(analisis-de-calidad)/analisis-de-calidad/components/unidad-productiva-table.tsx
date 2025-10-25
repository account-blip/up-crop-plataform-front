"use client"

import { ExpandableTable } from "@/components/expandable-table"
import { AnalisisDeCalidad } from "@/types/analisis-de-calidad/analisis-de-calidad.type"
import { analisisDeCalidadColumnsExpandable, renderAnalisisSubRow } from "./analisis-de-calidad-columns"

interface AnalisisDeCalidadTableProps {
  analisisDeCalidad: AnalisisDeCalidad[]
}

export default function AnalisisDeCalidadTable({analisisDeCalidad }: AnalisisDeCalidadTableProps) {
  return (
<ExpandableTable
  columns={analisisDeCalidadColumnsExpandable()}
  data={analisisDeCalidad}
  filter="fecha"
  renderSubComponent={renderAnalisisSubRow}
/>

  )
}