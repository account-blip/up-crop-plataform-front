'use client';

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { Defecto, TIPO_DEFECTO, TipoDefecto } from '@/types/analisis-de-calidad/defecto.type';
import { UpdateDefectoSchema, UpdateDefectoSchemaType } from '@/schemas/analisis-de-calidad/defecto.schema';
import { updateDefectoAction } from '@/actions/defecto/update-defecto.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UnidadInspeccion } from '@/types/analisis-de-calidad/unidad-inspeccion.type';
import { updateUnidadInspeccionSchema, UpdateUnidadInspeccionSchemaType } from '@/schemas/analisis-de-calidad/unidad-inspeccion.schema';
import { updateUnidadInspeccionAction } from '@/actions/unidad-inspeccion/update-unidad-inspeccion.action';


export function UpdateUnidadInspeccionDialog({ unidadInspeccion }: { unidadInspeccion: UnidadInspeccion }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateUnidadInspeccionSchemaType>({
    resolver: zodResolver(updateUnidadInspeccionSchema),
    defaultValues: {
      nombre: unidadInspeccion.nombre || '',
    },
  });


  const onSubmit = async (values: UpdateUnidadInspeccionSchemaType) => {
    startTransition(async () => {
      const response = await updateUnidadInspeccionAction(unidadInspeccion.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Unidad de inspeccion actualizada exitosamente');
        form.reset();
        setOpen(false);
      }
    });
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={() => setOpen(true)}
          >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
          </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Editar Unidad de inspeccion</DialogTitle>
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
              Editar Unidad de inspeccion
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
