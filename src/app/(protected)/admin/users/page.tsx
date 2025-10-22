import { Building2 } from "lucide-react"
import { getUsers } from "@/services/users.service"
import { getEmpresas } from "@/services/empresa.service"
import { CreateUserDialog } from "./components/create-user-dialog"
import { UserTable } from "./components/user-table"

export default async function UsersPage() {
  const users = await getUsers()
  const empresas = await getEmpresas()

  return (
    <div className="min-h-screen bg-cocos-black">
      <div className="border-b border-polar-bear/10 bg-cocos-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-titmouse/10 border border-blue-titmouse/20">
                <Building2 className="h-6 w-6 text-blue-titmouse" />
              </div>
              <div>
                <h1 className="font-ivypresto text-3xl font-semibold tracking-tight text-december-sky">
                  Gestión de Usuarios
                </h1>
                <p className="text-sm text-polar-bear/70 font-urbanist">
                  Administra y organiza los usuarios del sistema
                </p>
              </div>
            </div>
            <CreateUserDialog empresas={empresas?.data || []}/>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-xl border border-polar-bear/10 bg-cocos-black/30 p-6 shadow-xl">
          <UserTable users={users?.data || []} empresas={empresas?.data || []} />
        </div>
      </div>
    </div>
  )
}
