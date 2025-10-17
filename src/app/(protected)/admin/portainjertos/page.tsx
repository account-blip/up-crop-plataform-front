
import { BoxIcon, Database, ListOrdered } from "lucide-react"
import { GlobalTable } from "@/components/table"
import { CreatePortainjertoDialog } from "./components/create-portainjerto-dialog"
import { portainjertoColumns } from "./components/portainjerto-columns"
import { getPortainjertos } from "@/services/portainjerto.service"


export default async function PortainjertoPage() {
  const portainjertos = await getPortainjertos()


  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ListOrdered className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Gestión de Portainjertos</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza tus registros de datos</p>
              </div>
            </div>
            <CreatePortainjertoDialog />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <GlobalTable columns={portainjertoColumns} data={portainjertos?.data || []} filter="nombre" />
        </div>
      </div>
    </div>
  )
}
