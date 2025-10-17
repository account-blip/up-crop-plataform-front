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
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import {
  campoEspecificoSchema,
  CampoEspecificoSchemaType,
} from '@/schemas/campo-especifico.schema'
import { createCampoEspecificoAction } from '@/actions/campo-especifico/create-campo-especifico.action'
import { Campo } from '@/types/campo.type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateCampoEspecificoDialogProps {
  campos: Campo[]
}

export function CreateCampoEspecificoDialog({
  campos,
}: CreateCampoEspecificoDialogProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<CampoEspecificoSchemaType>({
    resolver: zodResolver(campoEspecificoSchema),
    defaultValues: {
      nombre: '',
      campoId: '',
    },
  })

  const onSubmit = (values: CampoEspecificoSchemaType) => {
    setError(undefined)
    setSuccess(undefined)

    startTransition(() => {
      createCampoEspecificoAction(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
          toast.success('Campo Específico creado exitosamente')
          setOpen(false)
        })
        .catch((error) => {
          console.error(error)
          setError('Error al crear el campo')
          toast.error('Error al crear el campo')
        })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          Crear Campo Específico
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Crear Campo Específico</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un campo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campos.map((campo) => (
                        <SelectItem key={campo.id} value={String(campo.id)}>
                          {campo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isPending}>
              Crear Campo Específico
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
