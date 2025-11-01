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


export function UpdateDefectoDialog({ defecto }: { defecto: Defecto }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateDefectoSchemaType>({
    resolver: zodResolver(UpdateDefectoSchema),
    defaultValues: {
      nombre: defecto.nombre || '',
      tipo: defecto.tipo || TIPO_DEFECTO[0]
    },
  });


  const onSubmit = async (values: UpdateDefectoSchemaType) => {
    startTransition(async () => {
      const response = await updateDefectoAction(defecto.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Defecto actualizado exitosamente');
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
          <DialogTitle>Editar Defecto</DialogTitle>
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
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                  <Select
                        {...form.register("tipo")}
                        onValueChange={(value) => form.setValue("tipo", value as TipoDefecto)}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPO_DEFECTO.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Editar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
