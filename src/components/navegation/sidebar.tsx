"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  User,
  Settings,
  ChevronRight,
  MapPin,
  Factory,
  Users,
  Sprout,
  ArrowLeft,
  BoxIcon,
  AlignHorizontalJustifyCenter,
  MapPinHouseIcon,
  Users2,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

interface SidebarProps {
  userRole?: "user" | "admin" | "superadmin";
  children?: React.ReactNode;
}

export function Sidebar({ userRole = "user" }: SidebarProps) {
  const pathname = usePathname();
  const [adminExpanded, setAdminExpanded] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const role = user?.role?.toUpperCase() ?? "USER";
  const isAdmin = role === "ADMIN" || role === "SUPERADMIN";

  const mainNavItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analisis", label: "Análisis de Calidad", icon: FlaskConical }
  ];

  const adminNavItems = [
    {
      href: "/admin/empresas",
      label: "Empresas",
      icon: MapPinHouseIcon,
      roles: ["SUPERADMIN"],
    },
    {
      href: "/admin/unidades-productivas",
      label: "Unidades Productivas",
      icon: AlignHorizontalJustifyCenter,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/admin/cuarteles",
      label: "Cuarteles",
      icon: MapPin,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/admin/variedades",
      label: "Variedades",
      icon: BoxIcon,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/admin/users",
      label: "Usuarios",
      icon: Users2,
      roles: ["SUPERADMIN"],
    },
  ];

  const filteredAdminItems = adminNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
   <div className="flex h-full flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-sidebar-foreground">
              UpCrop
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1 px-3 py-4">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin Section */}
        {isAdmin && filteredAdminItems.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Administración
            </div>
            <button
              onClick={() => setAdminExpanded(!adminExpanded)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                adminExpanded
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                Admin
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  adminExpanded && "rotate-90"
                )}
              />
            </button>

            {adminExpanded && (
              <div
                className="
                  mt-1 ml-4 space-y-1 border-l border-border pl-4
                  overflow-y-auto max-h-64
                  scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent
                  bg-black/10 rounded-lg
                "
              >
                {filteredAdminItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🧍 User Section always at bottom */}
      <div className="border-t border-border p-4 mt-auto">
        <NavUser
          userNav={{
            avatar: user?.image ?? "",
            email: user?.email ?? "",
            name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
            role: user?.role || "ADMIN",
            empresa: user?.empresa,
          }}
        />
      </div>
    </div>

    </aside>
  );
}
