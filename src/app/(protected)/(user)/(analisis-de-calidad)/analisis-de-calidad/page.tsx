import { AlignHorizontalJustifyCenter, Database } from "lucide-react"
import { auth } from "@/auth"
import { getAnalisisDeCalidad } from "@/services/analisis-de-calidad/analisis-de-calidad.service"
import { getVariedades } from "@/services/variedad.service"
import { getDefectos } from "@/services/analisis-de-calidad/defecto.service"
import { CreateAnalisisDeCalidadDialog } from "./components/create-analisis-de-calidad-dialog"
import { getCuarteles } from "@/services/cuartel.service"
import AnalisisDeCalidadTable from "./components/analisis-de-calidad-table"
import { getEspecies } from "@/services/especie.service"
import { getEtapaInpeccion } from "@/services/analisis-de-calidad/etapa-inspeccion.service"
import { getUnidadInpeccion } from "@/services/analisis-de-calidad/unidad-inspeccion.service"

export default async function AnalisisDeCalidadPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;

  const analisisResult = await getAnalisisDeCalidad(accessToken)

  const analisisDeCalidad = Array.isArray(analisisResult)
    ? analisisResult
    : analisisResult
    ? [analisisResult]
    : []
  
  const especies = await getEspecies(accessToken)
  const cuarteles = await getCuarteles(accessToken, userId || '')
  const defectos = await getDefectos(accessToken, userId || '')
  const etapas = await getEtapaInpeccion(accessToken, userId || '')
  const unidades = await getUnidadInpeccion(accessToken, userId || '')



  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <AlignHorizontalJustifyCenter className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Analisis de Calidad</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus Analisis de Calidad</p>
              </div>
            </div>
            <CreateAnalisisDeCalidadDialog especies={especies?.data || []} cuarteles={cuarteles?.data || []} defectos={defectos?.data || []} etapas={etapas?.data || []} unidades={unidades?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <AnalisisDeCalidadTable
            analisisDeCalidad={analisisDeCalidad || []}
            etapas={etapas?.data || []}
            cuarteles={cuarteles?.data || []}
            unidades={unidades?.data || []}
            especies={especies?.data || []}
            defectos={defectos?.data || []}
            />
        </div>
      </div>
    </div>
  )
}
