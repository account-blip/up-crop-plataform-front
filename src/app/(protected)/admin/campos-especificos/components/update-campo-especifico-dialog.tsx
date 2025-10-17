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
import { Campo } from '@/types/campo.type';
import { Input } from '@/components/ui/input';
import { updateCampoEspecificoSchema, UpdateCampoEspecificoSchemaType } from '@/schemas/campo-especifico.schema';
import { updateCampoEspecificoAction } from '@/actions/campo-especifico/update-campo-especifico.action';
import { CampoEspecifico } from '@/types/campo-especifico.type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pencil } from 'lucide-react';



export function UpdateCampoEspecificoDialog({ campoEspecifico, campos }: { campoEspecifico: CampoEspecifico, campos: Campo[] }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateCampoEspecificoSchemaType>({
    resolver: zodResolver(updateCampoEspecificoSchema),
    defaultValues: {
      nombre: campoEspecifico.nombre || '',
      campoId: campoEspecifico.campo.id || ''
    },
  });


  const onSubmit = async (values: UpdateCampoEspecificoSchemaType) => {
    startTransition(async () => {
      const response = await updateCampoEspecificoAction(campoEspecifico.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Campo Especifico actualizado exitosamente');
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
          <DialogTitle>Editar Campo Especifico</DialogTitle>
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
              Editar Campo Especifico
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
