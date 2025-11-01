"use client"

import { useState, useTransition, useEffect } from "react"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  AnalisisDeCalidadSchema,
  type AnalisisDeCalidadSchemaType,
} from "@/schemas/analisis-de-calidad/analisis-de-calidad.schema"
import { createAnalisisDeCalidadAction } from "@/actions/analisis-de-calidad/create-analisis-de-calidad.action"
import { toast } from "sonner"
import type { EtapaInspeccion } from "@/types/analisis-de-calidad/etapa-inspeccion.type"
import type { Cuartel } from "@/types/cuartel.type"
import type { UnidadInspeccion } from "@/types/analisis-de-calidad/unidad-inspeccion.type"
import type { Especie } from "@/types/especie.type"
import type { Defecto } from "@/types/analisis-de-calidad/defecto.type"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calendar, MapPin, Package, Leaf, Palette, AlertTriangle, CheckCircle2, Ruler, CheckCircle, ParkingMeter } from "lucide-react"

export function CreateAnalisisDeCalidadDialog({
  etapas,
  cuarteles,
  unidades,
  especies,
  defectos,
}: {
  etapas: EtapaInspeccion[]
  cuarteles: Cuartel[]
  unidades: UnidadInspeccion[]
  especies: Especie[]
  defectos: Defecto[]
}) {
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<AnalisisDeCalidadSchemaType>({
    resolver: zodResolver(AnalisisDeCalidadSchema),
    defaultValues: {
      fecha: new Date().toISOString().split("T")[0],
      etapaId: "",
      cuartelId: "",
      unidadInspeccion: { id: "", cantidad: 1 },
      universoMuestra: undefined,
      inspecciones: [],
    },
  })
  useEffect(() => {
    console.log("❗Errores actuales:", form.formState.errors)
  }, [form.formState.errors])
  
  // 🔁 Generar inspecciones según cantidad
  useEffect(() => {
    const cantidad = form.watch("unidadInspeccion.cantidad")
    if (cantidad && cantidad > 0) {
      const inspecciones = Array.from({ length: cantidad }, (_, i) => ({
        indice: i + 1,
        especieId: "",
        variedadId: "",
        calibres: [],
        colores: [],
        controlesCalidad: [
          { defectos: [] }, // calidad
          { defectos: [] }, // condición
        ],
        temperaturaBins: 0,
        brix:0,
      }))
      form.setValue("inspecciones", inspecciones)
    }
  }, [form.watch("unidadInspeccion.cantidad")])

  const onSubmit = (values: AnalisisDeCalidadSchemaType) => {
    startTransition(() => {
      createAnalisisDeCalidadAction(values)
        .then((data) => {
          // 🔹 Si el backend devolvió error, mostramos el mensaje
          if (data?.error) {
            toast.error(data.error || "❌ Error al crear el análisis")
            return // 🚫 No cerrar el dialog
          }
  
          // 🔹 Si todo salió bien
          toast.success(
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400 w-5 h-5" />
              <span>Análisis creado correctamente</span>
            </div>
          )
          setOpen(false) // ✅ Cerrar solo si fue exitoso
        })
        .catch((err) => {
          // 🔹 Error de red o fallo inesperado
          console.error("❌ Error:", err)
          toast.error("⚠️ Error al conectar con el servidor")
        })
    })
  }
  

  const steps = [
    { number: 1, title: "Etapa de Inspección", icon: Calendar },
    { number: 2, title: "Selección de Cuartel", icon: MapPin },
    { number: 3, title: "Unidades de Inspección", icon: Package },
    { number: 4, title: "Especie", icon: Leaf },
    { number: 5, title: "Variedad", icon: Leaf },
    { number: 6, title: "Defectos de Calidad", icon: AlertTriangle },
    { number: 7, title: "Defectos de Condición", icon: CheckCircle2 },
    { number: 8, title: "Calibres", icon: Ruler },
    { number: 9, title: "Colores", icon: Palette },
    { number: 10, title: "Temperaturas", icon: ParkingMeter },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#485FFF] text-white hover:bg-[#485FFF]/90 font-semibold px-6 py-2.5 rounded-lg shadow-lg transition-all"
          onClick={() => setOpen(true)}
        >
          + Crear Análisis de Calidad
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl h-auto flex flex-col overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1D1D1D] shadow-2xl">
        <DialogHeader className="mb-2 border-b border-[#2a2a2a] px-6 pt-5 flex-shrink-0">
          <DialogTitle className="text-3xl font-['IvyPresto_Display'] font-semibold text-[#FDFFFF]">
            Nuevo Análisis de Calidad
          </DialogTitle>
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            {steps.map((s, idx) => {
              const Icon = s.icon
              const isActive = step === s.number
              const isCompleted = step > s.number
              const isTop = idx % 2 === 0 // Alternate: even indices at top, odd at bottom

              return (
                <div
                  key={s.number}
                  className={`flex flex-col items-center transition-all duration-300 ${isTop ? "mt-0" : "mt-8"}`}
                  style={{ flex: "1 1 0" }}
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#485FFF] text-white shadow-lg shadow-[#485FFF]/30 scale-110"
                        : isCompleted
                          ? "bg-[#485FFF]/20 text-[#485FFF]"
                          : "bg-[#2a2a2a] text-[#666]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs mt-2 text-center font-['Urbanist'] transition-colors max-w-[90px] leading-tight ${
                      isActive ? "text-[#FDFFFF] font-semibold" : "text-[#666]"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        </DialogHeader>


        <div className="flex-1 overflow-y-auto px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
              {/* PASO 1: Etapa */}
              {step === 1 && (
                <div className="bg-[#2a2a2a]/30 rounded-xl p-8 border border-[#2a2a2a]">
                  <FormField
                    control={form.control as any}
                    name="etapaId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FDFFFF] text-lg font-['Urbanist'] font-semibold">
                          Seleccione la Etapa de Inspección
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                              <SelectValue placeholder="Seleccionar etapa" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
                            {etapas.map((e) => (
                              <SelectItem key={e.id} value={e.id} className="text-[#FDFFFF] hover:bg-[#485FFF]/20">
                                {e.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* PASO 2: Cuartel */}
              {step === 2 && (
                <div className="bg-[#2a2a2a]/30 rounded-xl p-8 border border-[#2a2a2a]">
                  <FormField
                    control={form.control as any}
                    name="cuartelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FDFFFF] text-lg font-['Urbanist'] font-semibold">
                          Seleccione el Cuartel
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                              <SelectValue placeholder="Seleccionar cuartel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
                            {cuarteles.map((c) => (
                              <SelectItem key={c.id} value={c.id} className="text-[#FDFFFF] hover:bg-[#485FFF]/20">
                                {c.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* PASO 3: Unidad + Universo muestra */}
              {step === 3 && (
                <div className="bg-[#2a2a2a]/30 rounded-xl p-8 border border-[#2a2a2a] space-y-6">
                  <h3 className="text-[#FDFFFF] text-lg font-['Urbanist'] font-semibold mb-4">
                    Configuración de Unidades de Inspección
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control as any}
                      name="unidadInspeccion.id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#D6D7D8] font-['Urbanist']">Unidad de inspección</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                                <SelectValue placeholder="Seleccionar unidad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
                              {unidades.map((u) => (
                                <SelectItem key={u.id} value={u.id} className="text-[#FDFFFF] hover:bg-[#485FFF]/20">
                                  {u.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="unidadInspeccion.cantidad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#D6D7D8] font-['Urbanist']">Cantidad de unidades</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              value={field.value}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control as any}
                      name="universoMuestra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#D6D7D8] font-['Urbanist']">Universo muestra</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ej: 20"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step >= 4 &&
                form.watch("inspecciones")?.map((unidad, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#2a2a2a]/40 to-[#2a2a2a]/20 rounded-xl p-6 border-2 border-[#485FFF]/30 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a2a2a]">
                      <div className="w-10 h-10 rounded-full bg-[#485FFF] flex items-center justify-center text-white font-bold font-['Urbanist']">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-['IvyPresto_Display'] font-semibold text-[#FDFFFF]">
                        Unidad de Inspección #{index + 1}
                      </h3>
                    </div>

                    {/* 4 - Especie */}
                    {step === 4 && (
                      <FormField
                        control={form.control as any}
                        name={`inspecciones.${index}.especieId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">Especie</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                                form.setValue(`inspecciones.${index}.variedadId`, "")
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                                  <SelectValue placeholder="Seleccionar especie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
                                {especies?.map((e) => (
                                  <SelectItem key={e.id} value={e.id} className="text-[#FDFFFF] hover:bg-[#485FFF]/20">
                                    {e.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* 5 - Variedad */}
                    {step === 5 && (
                      <FormField
                        control={form.control as any}
                        name={`inspecciones.${index}.variedadId`}
                        render={({ field }) => {
                          const especieSel = especies?.find(
                            (e) => e.id === form.watch(`inspecciones.${index}.especieId`),
                          )
                          const variedades = especieSel?.variedades || []
                          return (
                            <FormItem>
                              <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">Variedad</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                                    <SelectValue placeholder="Seleccionar variedad" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
                                  {variedades.map((v) => (
                                    <SelectItem
                                      key={v.id}
                                      value={v.id}
                                      className="text-[#FDFFFF] hover:bg-[#485FFF]/20"
                                    >
                                      {v.nombre}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />
                    )}

                    {/* 6 - Defectos de Calidad */}
                    {step === 6 && (
                      <DefectoSection
                        form={form}
                        label="Defectos de Calidad"
                        tipo="CALIDAD"
                        defectos={defectos}
                        path={`inspecciones.${index}.controlesCalidad.0.defectos`}
                      />
                    )}

                    {/* 7 - Defectos de Condición */}
                    {step === 7 && (
                      <DefectoSection
                        form={form}
                        label="Defectos de Condición"
                        tipo="CONDICION"
                        defectos={defectos}
                        path={`inspecciones.${index}.controlesCalidad.1.defectos`}
                      />
                    )}

                    {/* 8 - Calibres */}
                    {step === 8 && (
                      <DynamicArraySection
                        form={form}
                        label="Calibres"
                        path={`inspecciones.${index}.calibres`}
                        placeholders={["Calibre", "Cantidad"]}
                      />
                    )}

                    {/* 9 - Colores */}
                    {step === 9 && (
                      <DynamicArraySection
                        form={form}
                        label="Colores"
                        path={`inspecciones.${index}.colores`}
                        placeholders={["Color", "Cantidad"]}
                      />
                    )}

                      {/* 10 - Temperatura y Brix */}
                      {step === 10 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control as any}
                            name={`inspecciones.${index}.temperaturaBins`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">
                                  Temperatura Bins (°C)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="Ej: 12.5"
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control as any}
                            name={`inspecciones.${index}.brix`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">
                                  Brix (°B)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="Ej: 15.2"
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                  </div>
                ))}
            </form>
          </Form>
        </div>

        <div className="flex-shrink-0 border-t border-[#2a2a2a] px-6 py-4 bg-[#1D1D1D]">
          <div className="flex justify-between items-center">
            {step > 1 ? (
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="border-[#2a2a2a] text-[#D6D7D8] hover:bg-[#2a2a2a] hover:text-[#FDFFFF] font-['Urbanist']"
              >
                ← Anterior
              </Button>
            ) : (
              <div />
            )}
            {step < 10 ? (
              <Button
                type="button"
                className="bg-[#485FFF] hover:bg-[#485FFF]/90 text-white font-['Urbanist'] font-semibold px-8"
                onClick={() => setStep((s) => s + 1)}
              >
                Siguiente →
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#485FFF] hover:bg-[#485FFF]/90 text-white font-['Urbanist'] font-semibold px-8"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? "Guardando..." : "Guardar análisis"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* Improved subcomponents with better styling */

function DefectoSection({ form, label, tipo, defectos, path }: any) {
  const defectosFiltrados = defectos.filter((d: any) => d.tipo === tipo)
  return (
    <FormField
      control={form.control as any}
      name={path}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              const current = field.value ?? []
              if (!current.some((d: any) => d.id === value)) {
                field.onChange([...current, { id: value, porcentaje: 0 }])
              }
            }}
          >
            <FormControl>
              <SelectTrigger className="h-12 bg-[#1D1D1D] border-[#2a2a2a] text-[#FDFFFF] hover:border-[#485FFF] transition-colors">
                <SelectValue placeholder="Agregar defecto" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-[#1D1D1D] border-[#2a2a2a]">
              {defectosFiltrados.map((d: any) => (
                <SelectItem key={d.id} value={d.id} className="text-[#FDFFFF] hover:bg-[#485FFF]/20">
                  {d.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 space-y-3">
            {field.value?.map((d: any, i: number) => (
              <div
                key={i}
                className="flex gap-3 items-center bg-[#1D1D1D] border border-[#2a2a2a] p-4 rounded-lg hover:border-[#485FFF]/50 transition-colors"
              >
                <span className="flex-1 text-[#FDFFFF] font-['Urbanist']">
                  {defectos.find((x: any) => x.id === d.id)?.nombre}
                </span>
                <Input
                  type="number"
                  placeholder="%"
                  value={d.porcentaje}
                  onChange={(e) => {
                    const list = [...field.value]
                    list[i].porcentaje = Number(e.target.value)
                    field.onChange(list)
                  }}
                  className="w-24 h-10 bg-[#2a2a2a] border-[#2a2a2a] text-[#FDFFFF]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => field.onChange(field.value.filter((_: any, j: number) => j !== i))}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  )
}

function DynamicArraySection({ form, label, path, placeholders }: any) {
  return (
    <div>
      <FormLabel className="text-[#D6D7D8] font-['Urbanist'] font-semibold">{label}</FormLabel>
      <div className="space-y-3 mt-4">
        {(form.watch(path) || []).map((item: any, i: number) => (
          <div key={i} className="flex gap-3 bg-[#1D1D1D] border border-[#2a2a2a] p-4 rounded-lg">
            <Input
              placeholder={placeholders[0]}
              value={item[placeholders[0].toLowerCase()] || ""}
              onChange={(e) => {
                const arr = form.getValues(path)
                arr[i][placeholders[0].toLowerCase()] = e.target.value
                form.setValue(path, arr)
              }}
              className="flex-1 h-10 bg-[#2a2a2a] border-[#2a2a2a] text-[#FDFFFF]"
            />
            <Input
              placeholder={placeholders[1]}
              type="number"
              value={item.cantidad}
              onChange={(e) => {
                const arr = form.getValues(path)
                arr[i].cantidad = Number(e.target.value)
                form.setValue(path, arr)
              }}
              className="w-32 h-10 bg-[#2a2a2a] border-[#2a2a2a] text-[#FDFFFF]"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-4 border-[#485FFF] text-[#485FFF] hover:bg-[#485FFF]/10 font-['Urbanist'] bg-transparent"
        onClick={() => {
          const current = form.getValues(path) || []
          form.setValue(path, [
            ...current,
            { fecha: form.getValues("fecha"), [placeholders[0].toLowerCase()]: "", cantidad: 0 },
          ])
        }}
      >
        + Agregar {label.toLowerCase().slice(0, -1)}
      </Button>
    </div>
  )
}
