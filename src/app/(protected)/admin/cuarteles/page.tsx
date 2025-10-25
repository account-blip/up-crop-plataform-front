
import { HousePlus, MapPin } from "lucide-react"
import { getCuarteles } from "@/services/cuartel.service"
import { CreateCuartelDialog } from "./components/create-cuartel-dialog"
import { getUnidadesProductivas } from "@/services/unidad-especifica.service"
import CuartelTable from "./components/cuartel-table"
import { auth } from "@/auth"

export default async function CuartelPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;
  const cuarteles = await getCuarteles(accessToken,userId)
  const unidadesProductivas = await getUnidadesProductivas(accessToken,userId)

  return (
    <div className="min-h-screen bg-cocos-black">
      <div className="border-b border-polar-bear/10 bg-cocos-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-ivypresto text-3xl font-semibold tracking-tight text-december-sky">
                  Gestión de Cuarteles
                </h1>
                <p className="text-sm text-polar-bear/70 font-urbanist">
                  Administra y organiza los cuarteles de la empresa
                </p>
              </div>
            </div>
            <CreateCuartelDialog unidadesProductivas={unidadesProductivas?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-polar-bear/10 bg-cocos-black/30 p-6 shadow-xl">
        <CuartelTable cuarteles={cuarteles?.data || []} unidadesProductivas={unidadesProductivas?.data || []}/>
        </div>
      </div>
    </div>
  )
}


