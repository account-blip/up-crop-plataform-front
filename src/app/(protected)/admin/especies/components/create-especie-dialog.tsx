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
import { variedadSchema, VariedadSchemaType } from '@/schemas/variedad.schema';
import { createVariedadAction } from '@/actions/variedad/create-variedad.action';
import { especieSchema, EspecieSchemaType } from '@/schemas/especie.schema';
import { createEspecieAction } from '@/actions/especie/create-especie.action';

export function CreateEspecieDialog() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<EspecieSchemaType>({
    resolver: zodResolver(especieSchema),
    defaultValues: {
      nombre: '',
    },
  });

  const onSubmit = (values: EspecieSchemaType) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      createEspecieAction(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          toast.success('Especie creada exitosamente');
          setOpen(false)
        })
        .catch((error) => {
          console.error(error);
          setError('Error al crear la Especie');
          toast.error(error);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          Crear Especie
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Crear Especie</DialogTitle>
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
