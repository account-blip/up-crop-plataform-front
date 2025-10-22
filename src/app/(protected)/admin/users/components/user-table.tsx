"use client"

import { GlobalTable } from "@/components/table"
import { userColumns } from "./user-columns"
import { User } from "@/types/user.type"
import { Empresa } from "@/types/empresa.type"

export function UserTable({
  users,
  empresas,
}: {
  users: User[]
  empresas: Empresa[]
}) {
  return (
    <GlobalTable
      columns={userColumns(empresas)}
      data={users}
      filter="firstName"
    />
  )
}
