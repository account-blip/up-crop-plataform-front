import { getCuarteles } from "@/services/cuartel.service"
import { getUnidadesProductivas } from "@/services/unidad-especifica.service"
import { getEstimacionesDeCosecha } from "@/services/estimacion-de-cosecha.service"
import { getVariedades } from "@/services/variedad.service"
import { getPortainjertos } from "@/services/portainjerto.service"
import { BarChart3, Calendar, Sprout, TrendingUp } from "lucide-react"
import DatosReservadosTable from "./components/datos-reservados-table"
import { CreateDatoReservadoDialog } from "./components/create-datos-reservado-dialog"
import { auth } from "@/auth"

export default async function CuartelPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;

  const datosReservados = await getEstimacionesDeCosecha(accessToken, userId);
  const variedades = await getVariedades()
  const portainjertos = await getPortainjertos()
  const cuarteles = await getCuarteles(accessToken,userId)
  const unidadesProductivas = await getUnidadesProductivas(accessToken,userId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4166f5] via-[#4d6ff7] to-[#5b7cff] pb-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm ring-1 ring-white/30">
                <Sprout className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Datos Reservados</h1>
                <p className="mt-2 text-lg text-blue-50">
                  Monitoreo y análisis de datos reservados para optimizar la producción
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl bg-white p-6 shadow-lg shadow-blue-500/10 ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-[#4166f5] to-[#5b7cff] p-3 shadow-lg shadow-blue-500/30">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Registros</p>
                <p className="text-2xl font-bold">{datosReservados?.data.length || 0}</p>

              </div>
            </div>
          </div>

          <div className="group rounded-2xl bg-white p-6 shadow-lg shadow-emerald-500/10 ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 shadow-lg shadow-emerald-500/30">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Campos Activos</p>
                <p className="text-3xl font-bold text-slate-900">{unidadesProductivas?.data.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl bg-white p-6 shadow-lg shadow-violet-500/10 ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 p-3 shadow-lg shadow-violet-500/30">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Variedades</p>
                <p className="text-3xl font-bold text-slate-900">4</p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl bg-white p-6 shadow-lg shadow-amber-500/10 ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-3 shadow-lg shadow-amber-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Última Actualización</p>
                <p className="text-xl font-bold text-slate-900">Hoy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Botón flotante sobre la tabla */}
<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="absolute top-12 right-10 z-10">
    <div className="group rounded-2xl bg-white p-0 shadow-lg shadow-blue-800/40 ring-1 ring-slate-200/50 transition-all hover:shadow-xl hover:-translate-y-1">
      <CreateDatoReservadoDialog 
        variedades={variedades?.data || []}
        portainjertos={portainjertos?.data || []}
        cuarteles={cuarteles?.data || []}
        unidadesProductivas={unidadesProductivas?.data || []}
      />
    </div>
  </div>
</div>





      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <div className="rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Datos de Estimación</h2>
            <p className="mt-1 text-sm text-slate-600">
              Gestiona y visualiza todos los registros de estimación de cosecha
            </p>
          </div>
          <DatosReservadosTable
          estimacionDeCosecha={datosReservados?.data || []}
          variedades={variedades?.data || []}
          portainjertos={portainjertos?.data || []}
          cuarteles={cuarteles?.data || []}
          unidadesProductivas={unidadesProductivas?.data || []}
          />
        </div>
      </div>
    </div>
  )


}

