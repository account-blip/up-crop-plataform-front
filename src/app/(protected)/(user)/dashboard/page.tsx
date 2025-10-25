"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, TrendingUp, BarChart3, Layers } from "lucide-react"
import { useState, useEffect } from "react"
import type { Empresa } from "@/types/empresa.type"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - replace with actual API call
async function getEmpresasData() {
  const mockData: Empresa[] = [
    {
      id: "1",
      nombre: "Empresa Agrícola del Sur",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      unidadesProductiva: [
        {
          id: "up-1",
          nombre: "Unidad Productiva Norte",
          empresa: {} as any,
          cuarteles: [
            {
              id: "c-1",
              nombre: "Cuartel A1",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "c-2",
              nombre: "Cuartel A2",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "c-3",
              nombre: "Cuartel A3",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "up-2",
          nombre: "Unidad Productiva Sur",
          empresa: {} as any,
          cuarteles: [
            {
              id: "c-4",
              nombre: "Cuartel B1",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "c-5",
              nombre: "Cuartel B2",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      users: [],
    },
    {
      id: "2",
      nombre: "Agroindustrial Central",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      unidadesProductiva: [
        {
          id: "up-3",
          nombre: "Unidad Productiva Este",
          empresa: {} as any,
          cuarteles: [
            {
              id: "c-6",
              nombre: "Cuartel C1",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "c-7",
              nombre: "Cuartel C2",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "c-8",
              nombre: "Cuartel C3",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "up-4",
          nombre: "Unidad Productiva Oeste",
          empresa: {} as any,
          cuarteles: [
            {
              id: "c-9",
              nombre: "Cuartel D1",
              unidadesProductiva: {} as any,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      users: [],
    },
  ]

  return mockData
}

export default function DashboardPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [selectedEmpresaId, setSelectedEmpresaId] = useState<string>("")
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)

  useEffect(() => {
    getEmpresasData().then((data) => {
      setEmpresas(data)
      if (data.length > 0) {
        setSelectedEmpresaId(data[0].id)
        setSelectedEmpresa(data[0])
      }
    })
  }, [])

  useEffect(() => {
    const empresa = empresas.find((e) => e.id === selectedEmpresaId)
    setSelectedEmpresa(empresa || null)
  }, [selectedEmpresaId, empresas])

  // Calculate metrics
  const totalUnidades = selectedEmpresa?.unidadesProductiva?.length || 0
  const totalCuarteles =
    selectedEmpresa?.unidadesProductiva?.reduce((acc, up) => acc + (up.cuarteles?.length || 0), 0) || 0

  // Prepare chart data
  const unidadesChartData =
    selectedEmpresa?.unidadesProductiva?.map((up) => ({
      nombre: up.nombre,
      cuarteles: up.cuarteles?.length || 0,
    })) || []

  const empresasComparisonData = empresas.map((empresa) => ({
    nombre: empresa.nombre,
    unidades: empresa.unidadesProductiva?.length || 0,
    cuarteles: empresa.unidadesProductiva?.reduce((acc, up) => acc + (up.cuarteles?.length || 0), 0) || 0,
  }))
  const colors = [
    "var(--chart-1)",
  ]
  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Análisis detallado de tu empresa</p>
              </div>
            </div>

            {/* Company Selector */}
            <div className="w-full sm:w-auto">
              <Select value={selectedEmpresaId} onValueChange={setSelectedEmpresaId}>
                <SelectTrigger className="w-full sm:w-[280px] bg-background">
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  {empresas.map((empresa) => (
                    <SelectItem key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Empresa Seleccionada</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{selectedEmpresa?.nombre || "N/A"}</p>
                <p className="mt-1 text-sm text-muted-foreground">Gestión centralizada</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unidades Productivas</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{totalUnidades}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-primary">
                  <Layers className="h-4 w-4" />
                  Activas
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                <Layers className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cuarteles</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{totalCuarteles}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-chart-3">
                  <MapPin className="h-4 w-4" />
                  Registrados
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <MapPin className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Cuarteles por Unidad Productiva */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Cuarteles por Unidad Productiva</h2>
            <p className="text-sm text-muted-foreground mb-6">Distribución de cuarteles en {selectedEmpresa?.nombre}</p>
            {unidadesChartData.length > 0 ? (
              <ChartContainer
                config={{
                  cuarteles: {
                    label: "Cuarteles",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={unidadesChartData}>
                    <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cuarteles" radius={[8, 8, 0, 0]}>
                      {unidadesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </Card>

          {/* Comparativa entre Empresas */}
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Comparativa entre Empresas</h2>
            <p className="text-sm text-muted-foreground mb-6">Unidades productivas y cuarteles por empresa</p>
            <ChartContainer
              config={{
                unidades: {
                  label: "Unidades",
                  color: "hsl(var(--chart-2))",
                },
                cuarteles: {
                  label: "Cuarteles",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={empresasComparisonData}>
                  <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="unidades" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="cuarteles" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>

        {/* Detailed View */}
        <Card className="border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Detalle de Unidades Productivas</h2>
          <p className="text-sm text-muted-foreground mb-6">Vista detallada de {selectedEmpresa?.nombre}</p>

          {selectedEmpresa?.unidadesProductiva && selectedEmpresa.unidadesProductiva.length > 0 ? (
            <div className="space-y-4">
              {selectedEmpresa.unidadesProductiva.map((unidad, index) => (
                <div
                  key={unidad.id}
                  className="border border-border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors[index % colors.length] + "20" }}
                      >
                        <Layers className="h-5 w-5" style={{ color: colors[index % colors.length] }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{unidad.nombre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {unidad.cuarteles?.length || 0} {unidad.cuarteles?.length === 1 ? "cuartel" : "cuarteles"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Activa</span>
                    </div>
                  </div>

                  {unidad.cuarteles && unidad.cuarteles.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3 pt-3 border-t border-border">
                      {unidad.cuarteles.map((cuartel) => (
                        <div
                          key={cuartel.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border"
                        >
                          <MapPin className="h-3.5 w-3.5 text-primary/60" />
                          <span className="text-sm text-foreground">{cuartel.nombre}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay unidades productivas registradas para esta empresa</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
