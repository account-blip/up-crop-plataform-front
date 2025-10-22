import { Building2 } from "lucide-react"
import { GlobalTable } from "@/components/table"
import { empresaColumns } from "./components/empresa-columns"
import { CreateEmpresaDialog } from "./components/create-empresa-dialog"
import { getEmpresas } from "@/services/empresa.service"
import { ExpandableTable } from "@/components/expandable-table"
import { empresaColumnsExpandable, renderSubComponent } from "./components/empresa-columns-expandable"

// Mock data - replace with actual data fetching
export default async function EmpresasPage() {

  const empresas = await getEmpresas()


  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Gestión de Empresas</h1>
                <p className="text-sm text-muted-foreground">Administra y organiza las empresas del sistema</p>
              </div>
            </div>
            <CreateEmpresaDialog />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-border bg-card/30 p-6 shadow-xl">
          <ExpandableTable
            columns={empresaColumnsExpandable}
            data={empresas?.data || []}
            filter="nombre"
            renderSubComponent={renderSubComponent}
          />
        </div>
      </div>
    </div>
  )
}


