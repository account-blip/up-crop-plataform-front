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
  BoxSelectIcon,
  Circle,
  PaperclipIcon,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";
import Image from "next/image"

interface SidebarProps {
  userRole?: "user" | "admin" | "superadmin";
  children?: React.ReactNode;
}

export function Sidebar({ userRole = "user" }: SidebarProps) {
  const pathname = usePathname();
  const [adminExpanded, setAdminExpanded] = useState(false);
  const { data: session, status  } = useSession();

  if (status === "loading") {
    return (
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Cargando...</span>
      </aside>
    );
  }
  const user = session?.user;
  const [analisisExpanded, setAnalisisExpanded] = useState(false);


  const role = user?.role?.toUpperCase() ?? "USER";
  const isAdmin = role === "ADMIN" || role === "SUPERADMIN";

  const mainNavItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard }
  ];

  const analisisCalidadNavItems = [
    {
      href: "/analisis-de-calidad",
      label: "Análisis",
      icon: FlaskConical,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/defectos",
      label: "Defectos",
      icon: FileText,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/etapas-de-inspeccion",
      label: "Etapas de Inspeccion",
      icon: Circle,
      roles: ["ADMIN", "SUPERADMIN"],
    },
    {
      href: "/unidades-de-inspeccion",
      label: "Unidades de Inspeccion",
      icon: PaperclipIcon,
      roles: ["ADMIN", "SUPERADMIN"],
    },
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
      href: "/admin/especies",
      label: "Especies",
      icon: BoxSelectIcon,
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
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar flex flex-col">
        {/* Contenedor scrollable para el contenido del sidebar */}
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-50 w-50 mt-10 items-center justify-center rounded-lg">
                <Image
                  src="/logo-up-cropin.png"
                  alt="UpCrop Logo"
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Nav principal */}
          <nav className="mt-10 space-y-1 px-3 py-4 pb-20">
            {/* Dashboard */}
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
                  <Icon className="h-5 w-5 text-primary" />
                  {item.label}
                </Link>
              );
            })}

            {/* 📊 Sección de Análisis de Calidad */}
            <div className="py-4">
              <button
                onClick={() => setAnalisisExpanded(!analisisExpanded)}
                className={cn(
                  "cursor-pointer flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  analisisExpanded
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  Análisis de Calidad
                </div>
                <ChevronRight
                  className={cn("h-4 w-4 transition-transform", analisisExpanded && "rotate-90")}
                />
              </button>

              {analisisExpanded && (
                <div
                  className="
                    mt-1 ml-4 space-y-1 border-l border-border pl-4
                    overflow-y-auto max-h-64
                    scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent
                    bg-black/10 rounded-lg
                  "
                >
                  {/* 🧪 Link principal de Análisis */}
                  <Link
                    href="/analisis-de-calidad"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === "/analisis-de-calidad"
                        ? "bg-primary/10 text-primary"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <FlaskConical className="h-4 w-4 text-primary" />
                    Ver Análisis
                  </Link>

                  {/* ⚙️ Submenú de administración */}
                  <div className="mt-2">
                    <button
                      onClick={() => setAdminExpanded(!adminExpanded)}
                      className={cn(
                        "cursor-pointer flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        adminExpanded
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                      )}
                    >
                      <div className="cursor-pointer flex items-center gap-3">
                        <Settings className="h-4 w-4 text-primary" />
                        Administrar
                      </div>
                      <ChevronRight
                        className={cn("h-3 w-3 transition-transform", adminExpanded && "rotate-90")}
                      />
                    </button>

                    {adminExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                        <Link
                          href="/defectos"
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            pathname === "/defectos"
                              ? "bg-primary/10 text-primary"
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                          )}
                        >
                          <FileText className="h-4 w-4 text-primary" />
                          Defectos
                        </Link>

                        <Link
                          href="/etapas-de-inspeccion"
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            pathname === "/etapas-de-inspeccion"
                              ? "bg-primary/10 text-primary"
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                          )}
                        >
                          <Circle className="h-4 w-4 text-primary" />
                          Etapas de Inspección
                        </Link>

                        <Link
                          href="/unidades-de-inspeccion"
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            pathname === "/unidades-de-inspeccion"
                              ? "bg-primary/10 text-primary"
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                          )}
                        >
                          <PaperclipIcon className="h-4 w-4 text-primary" />
                          Unidades de Inspección
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 🧩 Admin Section */}
            {isAdmin && filteredAdminItems.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-primary">
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
                    <Settings className="h-5 w-5 text-primary" />
                    Admininstración
                  </div>
                  <ChevronRight
                    className={cn("cursor-pointer h-4 w-4 transition-transform", adminExpanded && "rotate-90")}
                  />
                </button>
                {adminExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
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
                          <Icon className="h-4 w-4 text-primary" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* 🧍 User Section sticky abajo */}
        <div className="border-t border-border p-4 sticky bottom-0 bg-sidebar">
          <NavUser
            userNav={{
              avatar: "/user-avatar.png",
              email: user?.email ?? "",
              name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
              role: user?.role || "ADMIN",
              empresa: user?.empresa,
            }}
          />
        </div>
      </aside>

  );
}
