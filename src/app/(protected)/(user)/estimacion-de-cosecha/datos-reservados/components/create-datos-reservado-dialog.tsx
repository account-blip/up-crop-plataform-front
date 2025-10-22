"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  EstimacionDeCosechaSchema,
  type EstimacionDeCosechaSchemaType,
} from "@/schemas/estimacion-de-cosecha.schema.type"
import { createEstimacionDeCosechaAction } from "@/actions/estimacion-de-cosecha/create-estimacion-de-cosecha.action"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import type { Cuartel } from "@/types/cuartel.type"
import type { Variedad } from "@/types/variedad.type"
import type { Portainjerto } from "@/types/portainjerto.type"
import { ESTADO_TYPE } from "@/types/estimacion-de-cosecha.type"
import { Plus } from "lucide-react"

export function CreateDatoReservadoDialog({
  unidadesProductivas,
  cuarteles,
  variedades,
  portainjertos,
}: {
  unidadesProductivas: UnidadProductiva[]
  cuarteles: Cuartel[]
  variedades: Variedad[]
  portainjertos: Portainjerto[]
}) {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<EstimacionDeCosechaSchemaType>({
    resolver: zodResolver(EstimacionDeCosechaSchema) as Resolver<EstimacionDeCosechaSchemaType>,
    defaultValues: {
      hilera: 0,
      arbol: 0,
      dardo: 0,
      ramilla: 0,
      estado: "PRE-PODA",
      foto: "",
      userId: "",
      campoEspecificoId: "",
      cuartelId: "",
      portainjertoId: "",
      variedadId: "",
    },
  })

  const onSubmit = (values: EstimacionDeCosechaSchemaType) => {
    startTransition(() => {
      createEstimacionDeCosechaAction(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          } else {
            toast.success("Dato Reservado creado exitosamente")
            form.reset()
            setOpen(false)
          }
        })
        .catch(() => toast.error("Error al crear el Dato Reservado"))
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
        >
          <Plus className="mr-2 h-5 w-5" />
          Crear Dato Reservado
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-5 text-center font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Crear Dato Reservado
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hilera */}
              <FormField
                control={form.control}
                name="hilera"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hilera</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Árbol */}
              <FormField
                control={form.control}
                name="arbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Árbol</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dardo */}
              <FormField
                control={form.control}
                name="dardo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dardo</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ramilla */}
              <FormField
                control={form.control}
                name="ramilla"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ramilla</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Estado */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ESTADO_TYPE.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Campo Específico */}
              <FormField
                control={form.control}
                name="campoEspecificoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campo Específico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unidadesProductivas.map((c) => (
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

              {/* Cuartel */}
              <FormField
                control={form.control}
                name="cuartelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuartel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
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

              {/* Variedad */}
              <FormField
                control={form.control}
                name="variedadId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variedad</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
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

              {/* Portainjerto */}
              <FormField
                control={form.control}
                name="portainjertoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portainjerto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {portainjertos.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Foto */}
            <FormField
              control={form.control}
              name="foto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Foto (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creando..." : "Crear Dato Reservado"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
