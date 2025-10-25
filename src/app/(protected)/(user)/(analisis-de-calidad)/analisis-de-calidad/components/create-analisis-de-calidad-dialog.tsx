'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray, Path } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnalisisDeCalidadSchema, AnalisisDeCalidadSchemaType } from '@/schemas/analisis-de-calidad/analisis-de-calidad.schema'
import { createAnalisisDeCalidadAction } from '@/actions/analisis-de-calidad/create-analisis-de-calidad.action'
import { Variedad } from '@/types/variedad.type'
import { Cuartel } from '@/types/cuartel.type'
import { Defecto } from '@/types/analisis-de-calidad/defecto.type'
import { Trash2 } from 'lucide-react'

interface CreateAnalisisDeCalidadDialogProps {
  variedades: Variedad[]
  cuarteles: Cuartel[]
  defectos: Defecto[]
}

export function CreateAnalisisDeCalidadDialog({
  variedades,
  cuarteles,
  defectos,
}: CreateAnalisisDeCalidadDialogProps) {
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<AnalisisDeCalidadSchemaType>({
    resolver: zodResolver(AnalisisDeCalidadSchema),
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0],
      temperaturaBins: 0,
      brix: 0,
      variedadId: '',
      cuartelId: '',
      calibres: [{ fecha: new Date().toISOString().split('T')[0], calibre: '', cantidad: 0, porcentaje: 0 }],
      colores: [{ fecha: new Date().toISOString().split('T')[0], color: '', cantidad: 0, porcentaje: 0 }],
      controlesCalidad: [
        { tipo: 'CAMPO', defectos: [] },
        { tipo: 'DESPACHO', defectos: [] },
      ],
    },
    shouldUnregister: false,
  })

  const { fields: calibres, append: appendCalibre, remove: removeCalibre } = useFieldArray({
    control: form.control,
    name: 'calibres',
  })

  const { fields: colores, append: appendColor, remove: removeColor } = useFieldArray({
    control: form.control,
    name: 'colores',
  })

  const { fields: controles } = useFieldArray({
    control: form.control,
    name: 'controlesCalidad',
  })

  const onSubmit = (values: AnalisisDeCalidadSchemaType) => {
    startTransition(() => {
      createAnalisisDeCalidadAction(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error)
            return
          }
          toast.success('✅ Análisis creado correctamente')
          setOpen(false)
        })
        .catch(() => toast.error('❌ Error al crear el análisis'))
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpen(true)}>Crear Análisis de Calidad</Button>
      </DialogTrigger>

      <DialogContent
  className={`max-h-[95vh] overflow-y-auto overflow-x-hidden scrollbar-custom !w-full ${
    step === 4 || step === 5 ? 'max-w-[90vw]' : 'max-w-4xl'
  }`}
>

        <DialogHeader>
          <DialogTitle>Crear Análisis de Calidad</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" 
            onKeyDown={(e) => {
              if (e.key === "Enter" && step < 5) {
                e.preventDefault();
              }
            }}>
            {/* ======================= */}
            {/* PASO 1 — PRINCIPAL */}
            {/* ======================= */}
            {step === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="variedadId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variedad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona una variedad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {variedades.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuartelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuartel</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona un cuartel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cuarteles.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="temperaturaBins"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Temperatura Bins</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brix"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Brix</FormLabel>
                        <FormControl>
                        <Input
                          type="number"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="h-12"
                        />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* ======================= */}
            {/* PASO 2 — CALIBRES */}
            {/* ======================= */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Calibres</h3>
                {calibres.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive"
                      onClick={() => removeCalibre(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <FormField
                      control={form.control}
                      name={`calibres.${index}.calibre`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calibre</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ej: 18mm" className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`calibres.${index}.cantidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad</FormLabel>
                          <FormControl>
                          <Input
                          type="number"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="h-12"
                        />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    appendCalibre({
                      fecha: new Date().toISOString().split('T')[0],
                      calibre: '',
                      cantidad: 0,
                      porcentaje: 0,
                    })
                  }
                >
                  ➕ Agregar otro calibre
                </Button>
              </div>
            )}

            {/* ======================= */}
            {/* PASO 3 — COLORES */}
            {/* ======================= */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Colores</h3>
                {colores.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive"
                      onClick={() => removeColor(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <FormField
                      control={form.control}
                      name={`colores.${index}.color`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ej: Rojo" className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`colores.${index}.cantidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad</FormLabel>
                          <FormControl>
                          <Input
                          type="number"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="h-12"
                        />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    appendColor({
                      fecha: new Date().toISOString().split('T')[0],
                      color: '',
                      cantidad: 0,
                      porcentaje: 0,
                    })
                  }
                >
                  ➕ Agregar otro color
                </Button>
              </div>
            )}
{/* ======================= */}
{/* PASO 4 — CONTROL EN CAMPO */}
{/* ======================= */}
{step === 4 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold mb-2">Control de Calidad — CAMPO</h3>

    {controles
      .filter((c) => c.tipo === 'CAMPO')
      .map((control, localIndex) => {
        const globalIndex = controles.findIndex((c) => c.tipo === control.tipo)

        return (
          <div key={control.id} className="border rounded-lg p-5 space-y-4 bg-card shadow-sm">
            <h4 className="font-semibold text-center text-lg mb-2">
              Control en Campo
            </h4>

            {/* SELECTOR DE DEFECTOS */}
            <FormField
              control={form.control}
              name={`controlesCalidad.${globalIndex}.defectos`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defectos</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const current = Array.isArray(field.value) ? field.value : []
                      if (!current.find((d) => d.id === value)) {
                        field.onChange([...current, { id: value, porcentaje: 0 }])
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecciona un defecto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {defectos.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.nombre} — {d.tipo === 'CALIDAD' ? 'Calidad' : 'Condición'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />



            {/* LISTA DE DEFECTOS SELECCIONADOS */}
            {form.watch(`controlesCalidad.${globalIndex}.defectos`)?.map((defectoObj, defectIndex) => {
  const defecto = defectos.find((d) => d.id === defectoObj.id)
  if (!defecto) return null

  return (
    <div
      key={defectoObj.id}
      className="flex items-center gap-4 border rounded-lg p-3 bg-muted"
    >
      <span className="flex-1 text-sm font-medium truncate">
        {defecto.nombre} ({defecto.tipo})
      </span>

      <FormField
        control={form.control}
        name={`controlesCalidad.${globalIndex}.defectos.${defectIndex}.porcentaje` as Path<AnalisisDeCalidadSchemaType>}
        render={({ field }) => (
          <FormItem className="w-28">
            <FormLabel className="text-xs">
              {defecto.tipo === "CALIDAD" ? "Porcentaje Calidad" : "Porcentaje Condición"}
            </FormLabel>
            <FormControl>
            <Input
              type="number"
              className="h-12 text-center text-lg font-semibold"
              value={typeof field.value === "number" ? field.value : 0}  // 👈 así garantizamos number
              onChange={(e) => field.onChange(Number(e.target.value))}
              onBlur={() => form.trigger()}
            />


            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          const current = [...form.getValues(`controlesCalidad.${globalIndex}.defectos`)]
          current.splice(defectIndex, 1)
          form.setValue(`controlesCalidad.${globalIndex}.defectos`, current)
        }}
      >
        <Trash2 className="h-5 w-5 text-destructive" />
      </Button>
    </div>
  )
})}

          </div>
        )
      })}
  </div>
)}
{/* ======================= */}
{/* PASO 5 — CONTROL EN DESPACHO */}
{/* ======================= */}
{step === 5 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold mb-2">Control de Calidad — DESPACHO</h3>

    {controles
      .filter((c) => c.tipo === 'DESPACHO')
      .map((control, localIndex) => {
        const globalIndex = controles.findIndex((c) => c.tipo === control.tipo)

        return (
          <div key={control.id} className="border rounded-lg p-5 space-y-4 bg-card shadow-sm">
            <h4 className="font-semibold text-center text-lg mb-2">
              Control en Despacho
            </h4>

            {/* SELECTOR DE DEFECTOS */}
            <FormField
              control={form.control}
              name={`controlesCalidad.${globalIndex}.defectos`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defectos</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const current = Array.isArray(field.value) ? field.value : []
                      if (!current.find((d) => d.id === value)) {
                        field.onChange([...current, { id: value, porcentaje: 0 }])
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecciona un defecto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {defectos.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.nombre} — {d.tipo === 'CALIDAD' ? 'Calidad' : 'Condición'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />



            {/* LISTA DE DEFECTOS SELECCIONADOS */}
            {form.watch(`controlesCalidad.${globalIndex}.defectos`)?.map((defectoObj, defectIndex) => {
  const defecto = defectos.find((d) => d.id === defectoObj.id)
  if (!defecto) return null

  return (
    <div
      key={defectoObj.id}
      className="flex items-center gap-4 border rounded-lg p-3 bg-muted"
    >
      <span className="flex-1 text-sm font-medium truncate">
        {defecto.nombre} ({defecto.tipo})
      </span>

      <FormField
        control={form.control}
        name={`controlesCalidad.${globalIndex}.defectos.${defectIndex}.porcentaje` as Path<AnalisisDeCalidadSchemaType>}
        render={({ field }) => (
          <FormItem className="w-28">
            <FormLabel className="text-xs">
              {defecto.tipo === "CALIDAD" ? "Porcentaje Calidad" : "Porcentaje Condición"}
            </FormLabel>
            <FormControl>
            <Input
                type="number"
                className="h-12 text-center text-lg font-semibold"
                value={typeof field.value === "number" ? field.value : 0}  // 👈 así garantizamos number
                onChange={(e) => field.onChange(Number(e.target.value))}
                onBlur={() => form.trigger()}
              />

            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          const current = [...form.getValues(`controlesCalidad.${globalIndex}.defectos`)]
          current.splice(defectIndex, 1)
          form.setValue(`controlesCalidad.${globalIndex}.defectos`, current)
        }}
      >
        <Trash2 className="h-5 w-5 text-destructive" />
      </Button>
    </div>
  )
})}

          </div>
        )
      })}
  </div>
)}

            {/* ======================= */}
            {/* FOOTER */}
            {/* ======================= */}
            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                  ⬅ Anterior
                </Button>
              )}
            {step < 5 ? (
              <Button type="button" onClick={() => setStep((s) => s + 1)}>
                Siguiente ➡
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                Confirmar y Guardar
              </Button>
            )}

            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
