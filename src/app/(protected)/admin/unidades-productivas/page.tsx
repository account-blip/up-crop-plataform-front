import { AlignHorizontalJustifyCenter, Database } from "lucide-react"
import { getUnidadesProductivas } from "@/services/unidad-especifica.service"
import { CreateUnidadProductivaDialog } from "./components/create-unidad-productiva-dialog"
import { getEmpresas } from "@/services/empresa.service"
import UnidadProductivaTable from "./components/unidad-productiva-table"
import { auth } from "@/auth"

export default async function UnidadesProductivasPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;
  const unidadesProductivas = await getUnidadesProductivas(accessToken,userId)
  const empresas = await getEmpresas()


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
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Unidades Productivas</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus registros de datos</p>
              </div>
            </div>
            <CreateUnidadProductivaDialog empresas={empresas?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <UnidadProductivaTable
            empresas={empresas?.data || []}
            unidadesProductivas={unidadesProductivas?.data || []}
            />
        </div>
      </div>
    </div>
  )
}
