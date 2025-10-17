
import { Camera, Database, HousePlusIcon } from "lucide-react"
import { GlobalTable } from "@/components/table"
import { getCuarteles } from "@/services/cuartel.service"
import { CreateCuartelDialog } from "./components/create-cuartel-dialog"
import { cuartelColumns } from "./components/cuartel-columns"
import { getCamposEspecificos } from "@/services/campo-especifico.service"
import CuartelTable from "./components/cuartel-table"
import { auth } from "@/auth"

export default async function CuartelPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;
  const cuarteles = await getCuarteles(accessToken,userId)
  const camposEspecificos = await getCamposEspecificos(accessToken,userId)


  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <HousePlusIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Cuarteles</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus registros de datos</p>
              </div>
            </div>
            <CreateCuartelDialog camposEspecificos={camposEspecificos?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <CuartelTable cuarteles={cuarteles?.data || []} camposEspecificos={camposEspecificos?.data || []}/>
        </div>
      </div>
    </div>
  )
}
