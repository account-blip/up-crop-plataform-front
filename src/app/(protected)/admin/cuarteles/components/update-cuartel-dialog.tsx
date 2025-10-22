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
import { Cuartel } from '@/types/cuartel.type';
import { updateCuartelSchema, UpdateCuartelSchemaType } from '@/schemas/cuartel.schema';
import { updateCuartelAction } from '@/actions/cuartel/update-cuartel.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UnidadProductiva } from '@/types/unidad-productiva.type';
import { Pencil } from 'lucide-react';



export function UpdateCuartelDialog({ cuartel, unidadesProductivas }: { cuartel: Cuartel, unidadesProductivas:UnidadProductiva[] }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateCuartelSchemaType>({
    resolver: zodResolver(updateCuartelSchema),
    defaultValues: {
      nombre: cuartel.nombre || '',
      unidadProductivaId: cuartel.unidadesProductiva?.id ?? ""
    },
  });


  const onSubmit = async (values: UpdateCuartelSchemaType) => {
    startTransition(async () => {
      const response = await updateCuartelAction(cuartel.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Cuartel actualizado exitosamente');
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
            className="w-1/2 justify-start"
            size="sm"
            onClick={() => setOpen(true)}
          >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
          </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Editar Cuartel</DialogTitle>
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
              name="unidadProductivaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad Productiva</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una unidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unidadesProductivas.map((unidad) => (
                        <SelectItem key={unidad.id} value={String(unidad.id)}>
                          {unidad.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Editar Cuartel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
