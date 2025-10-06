import { getCampos } from "@/services/campo.service"
import { campoColumns } from "./components/campo-columns"
import { CreateCampoDialog } from "./components/create-campo-dialog"
import { Database } from "lucide-react"
import { GlobalTable } from "@/components/table"

export default async function CampoPage() {
  const campos = await getCampos()

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Campos</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus registros de datos</p>
              </div>
            </div>
            <CreateCampoDialog />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <GlobalTable columns={campoColumns} data={campos?.data || []} filter="nombre" />
        </div>
      </div>
    </div>
  )
}
