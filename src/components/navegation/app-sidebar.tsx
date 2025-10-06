import { SidebarInset } from "@/components/ui/sidebar"
import type { ReactNode } from "react"
import { currentUser } from "@/lib/auth"
import { NavUser } from "./nav-user"
import AppBreadcrumb from "./app-breadcrumb"

interface AppNavbarProps {
  children: ReactNode
  adminSidebar: ReactNode
}

export async function AppNavbar({ children, adminSidebar }: AppNavbarProps) {
  const user = await currentUser()

  return (
    <>
      <div className="hidden md:block">{adminSidebar}</div>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-all">
          <div className="flex items-center gap-2 flex-1">
            <AppBreadcrumb />
          </div>

          <div className="ml-auto">
            <NavUser
              userNav={{
                avatar: user?.image ?? "",
                email: user?.email ?? "",
                name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
                role: user?.role || "ADMIN",
              }}
            />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  )
}
