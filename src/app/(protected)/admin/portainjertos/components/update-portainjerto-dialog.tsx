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
import { Portainjerto } from '@/types/portainjerto.type';
import { updatePortainjertoSchema, UpdatePortainjertoSchemaType } from '@/schemas/portainjerto.schema';
import { updatePortainjertoAction } from '@/actions/portainjerto/update-portainjerto.action';
import { Pencil } from 'lucide-react';



export function UpdatePortainjertoDialog({ portainjerto }: { portainjerto: Portainjerto }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdatePortainjertoSchemaType>({
    resolver: zodResolver(updatePortainjertoSchema),
    defaultValues: {
      nombre: portainjerto.nombre || '',
    },
  });


  const onSubmit = async (values: UpdatePortainjertoSchemaType) => {
    startTransition(async () => {
      const response = await updatePortainjertoAction(portainjerto.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Portainjerto actualizado exitosamente');
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
          <DialogTitle>Editar Portainjerto</DialogTitle>
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
              Editar Portainjerto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
