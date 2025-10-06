"use client"
import { ChevronsUpDown, LogOut, Key, UserIcon, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { User } from "next-auth"
import { logoutAction } from "@/actions/auth/logout.action"

export function NavUser({
  userNav,
}: {
  userNav: {
    name: string
    email: string
    avatar: string
    role: User["role"]
  }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-8 w-8 rounded-lg border border-border">
            <AvatarImage src={userNav.avatar || "/placeholder.svg"} alt={userNav.name} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
              {userNav.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col text-left text-sm leading-tight">
            <span className="truncate font-medium text-foreground">{userNav.name}</span>
            <span className="truncate text-xs text-muted-foreground">{userNav.email}</span>
          </div>
          <ChevronsUpDown className="ml-1 size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl" side="bottom" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1.5 py-1.5">
            <p className="text-sm font-semibold text-foreground">{userNav.name}</p>
            <p className="text-xs text-muted-foreground">{userNav.email}</p>
            <div className="mt-1">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {userNav.role}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin/perfil" className="flex items-center gap-2">
              <UserIcon className="size-4" />
              <span>Mi Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin/campos" className="flex items-center gap-2">
              <Key className="size-4" />
              <span>Administrar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin/configuracion" className="flex items-center gap-2">
              <Settings className="size-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logoutAction()}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="mr-2 size-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
