
import { BoxIcon } from "lucide-react"
import { CreateEspecieDialog } from "./components/create-especie-dialog"
import { EspecieCatalog } from "./components/especie-catalog"
import { getEspecies } from "@/services/especie.service"

export default async function VariedadPage() {
  const especies = await getEspecies()


  return (
    <div className="min-h-screen bg-cocos-black">
      <div className="border-b border-polar-bear/10 bg-cocos-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20">
                <BoxIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-ivypresto text-3xl font-semibold tracking-tight text-december-sky">
                  Gestión de Variedades
                </h1>
                <p className="text-sm text-polar-bear/70 font-urbanist">
                  Administra y organiza las variedades de la empresa
                </p>
              </div>
            </div>
            <CreateEspecieDialog />
          </div>
        </div>
      </div>
  
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-polar-bear/10 bg-cocos-black/30 p-6 shadow-xl">
        <EspecieCatalog especies={especies?.data || []} />
        </div>
      </div>
    </div>
  )
}
