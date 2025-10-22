"use client"

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "next-auth"
import { logoutAction } from "@/actions/auth/logout.action"
import { USER_ROLES } from "@/types/user.type"
import { Empresa } from "@/types/empresa.type"

export function NavUser({
  userNav,
}: {
  userNav: {
    name: string
    email: string
    avatar: string
    role: User["role"]
    empresa?: Empresa
  }
}) {
  const normalizedUser = {
    ...userNav,
    role: userNav.role.toLowerCase() as Lowercase<(typeof USER_ROLES)[number]>,
    campoNombre: userNav.empresa?.nombre?.toLowerCase() ?? "",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group cursor-pointer">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 bg-black hover:bg-zinc-900 transition-colors border border-white/10 text-white">
          <Avatar className="h-9 w-9 rounded-xl border border-white/20">
            <AvatarImage src={userNav.avatar || "/placeholder.svg"} alt={userNav.name} />
            <AvatarFallback className="rounded-xl bg-white/20 text-[10px] font-semibold uppercase text-white">
              {userNav.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col text-left text-sm leading-tight overflow-hidden">
            <span className="truncate font-medium text-white">{userNav.name}</span>
            <span className="truncate text-xs text-white/60">{userNav.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-white/50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl border border-white/10 bg-black text-white shadow-lg"
        side="top"
        align="start"
        sideOffset={10}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-2 py-2">
            <p className="text-sm font-semibold text-white">{userNav.name}</p>
            <p className="text-xs text-white/70">{userNav.email}</p>
            <div className="flex flex-col gap-2 mt-1">
              <span className="inline-block rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20 capitalize">
                {normalizedUser.role}
              </span>
              <span className="inline-block rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20 truncate">
                {userNav.empresa?.nombre ?? "Up-Crop"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={() => logoutAction()}
          className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-400" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
