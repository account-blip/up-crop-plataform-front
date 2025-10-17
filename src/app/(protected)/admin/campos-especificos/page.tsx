import { AlignHorizontalJustifyCenter, Database } from "lucide-react"
import { GlobalTable } from "@/components/table"
import { getCamposEspecificos } from "@/services/campo-especifico.service"
import { CreateCampoEspecificoDialog } from "./components/create-campo-especifico-dialog"
import { campoEspecificoColumns } from "./components/campo-especifico-columns"
import { getCampos } from "@/services/campo.service"
import CampoEspecificoTable from "./components/campo-especifico-table"
import { auth } from "@/auth"

export default async function CampoEspecificoPage() {
  const session = await auth(); 
  const userId = session?.user?.id;
  const accessToken = session?.token;
  const camposEspecificos = await getCamposEspecificos(accessToken,userId)
  const campos = await getCampos()


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
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Campos Especificos</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus registros de datos</p>
              </div>
            </div>
            <CreateCampoEspecificoDialog campos={campos?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <CampoEspecificoTable
            campos={campos?.data || []}
            camposEspecificos={camposEspecificos?.data || []}
            />
        </div>
      </div>
    </div>
  )
}
