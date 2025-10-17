"use client"

import {
  ChevronsUpDown,
  LogOut,
  Key,
  UserIcon,
  Settings,
  ChevronRight,
  BarChart3,
  ListTree,
  Leaf,
  MapPinHouseIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { User } from "next-auth"
import { logoutAction } from "@/actions/auth/logout.action"
import { Campo } from "@/types/campo.type"
import { USER_ROLES } from "@/types/user.type"

export function NavUser({
  userNav,
}: {
  userNav: {
    name: string
    email: string
    avatar: string
    role: User["role"]
    campo?: Campo
  }
}) {

  const normalizedUser = {
    ...userNav,
    role: userNav.role.toLowerCase() as Lowercase<(typeof USER_ROLES)[number]>,
    campoNombre: userNav.campo?.nombre?.toLowerCase() ?? "",
  }
  
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="group cursor-pointer">
        <button className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 bg-white/90 group-hover:bg-blue-100/10 group-focus:bg-blue-200/20 text-black transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-300 shadow-sm hover:shadow">
            <Avatar className="h-8 w-8 rounded-xl border border-slate-300">
              <AvatarImage src={userNav.avatar || "/placeholder.svg"} alt={userNav.name} />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#4166f5] to-indigo-100 text-[10px] font-semibold">
                {userNav.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex flex-col text-left text-sm leading-tight">
              <span className="truncate font-medium text-black/90">{userNav.name}</span>
              <span className="truncate text-xs text-black/70">{userNav.email}</span>
            </div>
            <ChevronsUpDown className="ml-1 size-4 text-black/60" />
          </button>
        </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl border-white/10 bg-gradient-to-b from-[#121a4a] via-[#15205a] to-[#1a2870] text-white" side="bottom" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1.5 py-1.5">
            <p className="text-sm font-semibold text-white">{userNav.name}</p>
            <p className="text-xs text-white/70">{userNav.email}</p>
            <div className="mt-1 flex flex-col gap-2">
            <span
              className="w-25 items-center text-center whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20 capitalize"
            >
              {normalizedUser.role.toLowerCase()}
            </span> 
              <span className="w-30 items-center text-center  items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                {userNav.campo?.nombre ? `${userNav.campo.nombre}` : ''}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
            <Link href="/admin/perfil" className="flex items-center gap-2">
              <UserIcon className="size-4 text-white hover:text-white" />
              <span className="text-white hover:text-white">Mi Perfil</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10">
            <Link href="/admin/campos" className="flex items-center gap-2 hover:text-white">
              <Key className="size-4 text-white hover:text-white" />
              <span className="text-white hover:text-white">Administrar</span>
            </Link>
          </DropdownMenuItem>

          {/* Submenú de Estimación de Cosecha */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer hover:bg-white/10 text-white focus:bg-white/10">
              <BarChart3 className="size-4 hover:text-white" />
              <span >Estimación de Cosecha</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56 rounded-xl border-white/10 bg-[#1a2870] text-white">
              <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-white/10 text-white focus:bg-white/10">
                <Link href="/estimacion-de-cosecha/datos-reservados" className="flex items-center gap-2 ">
                  <ListTree className="size-4 text-white hover:text-white" />
                  <span className="text-white hover:text-white">Datos Reservados</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-white/10 text-white focus:bg-white/10">
                <Link href="/estimacion-de-cosecha/estadisticas-generales" className="flex items-center gap-2">
                  <Key className="size-4 text-white hover:text-white" />
                  <span className="text-white hover:text-white">Estadisticas Generales</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10">
                <Link href="/estimacion-de-cosecha/ejecuciones-de-conteo" className="flex items-center gap-2">
                  <Leaf className="size-4 text-white hover:text-white" />
                  <span className="text-white hover:text-white">Ejecuciones De Conteo</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logoutAction()}
          className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut className="mr-2 size-4 text-white" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
