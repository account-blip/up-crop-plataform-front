'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { unidadInspeccionSchema, UnidadInspeccionSchemaType } from '@/schemas/analisis-de-calidad/unidad-inspeccion.schema';
import { createUnidadInspeccionAction } from '@/actions/unidad-inspeccion/create-unidad-inspeccion.action';

export function CreateUnidadInspeccionDialog() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UnidadInspeccionSchemaType>({
    resolver: zodResolver(unidadInspeccionSchema),
    defaultValues: {
      nombre: ''
    },
  });

  const onSubmit = (values: UnidadInspeccionSchemaType) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      createUnidadInspeccionAction(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          toast.success('Unidad de inspeccion creada exitosamente');
          setOpen(false)
        })
        .catch((error) => {
          console.error(error);
          setError('Error al crear la unidad');
          toast.error(error);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          Crear Unidad de inspeccion
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Crear Unidad de inspeccion</DialogTitle>
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

            <Button className="w-full" type="submit" disabled={isPending}>
              Crear
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
