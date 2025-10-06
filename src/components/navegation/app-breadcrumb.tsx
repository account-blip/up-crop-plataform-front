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
                      <BreadcrumbPage className="font-medium capitalize">
                        {seg}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={href}
                        className="capitalize text-muted-foreground hover:text-foreground"
                      >
                        {seg}
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
