"use client"

import { ExpandableTable } from "@/components/expandable-table"
import { AnalisisDeCalidad } from "@/types/analisis-de-calidad/analisis-de-calidad.type"
import { analisisDeCalidadColumnsExpandable, renderAnalisisSubRow } from "./analisis-de-calidad-columns"
import { Defecto } from "@/types/analisis-de-calidad/defecto.type"
import { Especie } from "@/types/especie.type"
import { UnidadInspeccion } from "@/types/analisis-de-calidad/unidad-inspeccion.type"
import { EtapaInspeccion } from "@/types/analisis-de-calidad/etapa-inspeccion.type"
import { Cuartel } from "@/types/cuartel.type"

interface AnalisisDeCalidadTableProps {
  analisisDeCalidad: AnalisisDeCalidad[]
  etapas: EtapaInspeccion[]
  cuarteles: Cuartel[]
  unidades: UnidadInspeccion[]
  especies: Especie[]
  defectos: Defecto[]
}

export default function AnalisisDeCalidadTable({analisisDeCalidad, etapas, cuarteles, unidades, especies, defectos }: AnalisisDeCalidadTableProps) {
  return (
<ExpandableTable
  columns={analisisDeCalidadColumnsExpandable({ etapas, cuarteles, unidades, especies, defectos })}
  data={analisisDeCalidad}
  filter="fecha"
  renderSubComponent={renderAnalisisSubRow}
/>

  )
}