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
import { Variedad } from '@/types/variedad.type';
import { UpdateVaridadSchemaType, updateVariedadSchema } from '@/schemas/variedad.schema';
import { updateVariedadAction } from '@/actions/variedad/update-variedad.action';
import { Pencil } from 'lucide-react';
import { Especie } from '@/types/especie.type';
import { updateEspecieSchema, UpdateEspecieSchemaType } from '@/schemas/especie.schema';
import { updateEspecieAction } from '@/actions/especie/update-especie.action';



export function UpdateEspecieDialog({ especie }: { especie: Especie }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateEspecieSchemaType>({
    resolver: zodResolver(updateEspecieSchema),
    defaultValues: {
      nombre: especie.nombre || '',
    },
  });


  const onSubmit = async (values: UpdateEspecieSchemaType) => {
    startTransition(async () => {
      const response = await updateEspecieAction(especie.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Especie actualizada exitosamente');
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
          <DialogTitle>Editar Especie</DialogTitle>
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
              Editar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
