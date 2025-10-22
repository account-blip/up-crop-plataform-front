"use client"

import { ExpandableTable } from "@/components/expandable-table"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import type { Empresa } from "@/types/empresa.type"
import { unidadProductivaColumnsExpandable, renderUnidadProductivaSubRow  } from "./unidad-productiva-expandable-columns"

interface UnidadProductivaTableProps {
  unidadesProductivas: UnidadProductiva[]
  empresas: Empresa[]
}

export default function UnidadProductivaTable({ unidadesProductivas, empresas }: UnidadProductivaTableProps) {
  return (
<ExpandableTable
  columns={unidadProductivaColumnsExpandable(empresas)}
  data={unidadesProductivas}
  filter="nombre"
  renderSubComponent={renderUnidadProductivaSubRow}
/>

  )
}