"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export default function AppBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const SEGMENT_LABELS: Record<string, string> = {
    admin: "Admin",
    "estimacion-de-cosecha": "Estimación de Cosecha",
    "datos-reservados": "Datos Reservados",
    home: "Inicio",
  }

  const toTitle = (seg: string) => {
    const decoded = decodeURIComponent(seg)
    if (SEGMENT_LABELS[decoded]) return SEGMENT_LABELS[decoded]
    return decoded
      .split("-")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
      .join(" ")
  }

  return (
    <>
      <Separator orientation="vertical" className="h-6" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/home"
              className="text-muted-foreground hover:text-foreground"
            >
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments
            .filter((seg) => seg !== "home") // 👈 ignoramos "home"
            .map((seg, index, arr) => {
              const href = "/" + segments.slice(0, index + 1).join("/")
              const isLast = index === arr.length - 1

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast || seg === "admin" ? (
                      <BreadcrumbPage className="font-medium">
                        {toTitle(seg)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {toTitle(seg)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              )
            })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
