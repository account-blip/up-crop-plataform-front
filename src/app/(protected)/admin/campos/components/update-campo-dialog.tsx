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
import { updateCampoSchema, UpdateCampoSchemaType } from '@/schemas/campo.schema';
import { updateCampoAction } from '@/actions/campo/update-campo.action';
import { Input } from '@/components/ui/input';



export function UpdateCampoDialog({ campo }: { campo: Campo }) {

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateCampoSchemaType>({
    resolver: zodResolver(updateCampoSchema),
    defaultValues: {
      nombre: campo.nombre || '',
    },
  });


  const onSubmit = async (values: UpdateCampoSchemaType) => {
    startTransition(async () => {
      const response = await updateCampoAction(campo.id, values);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Campo actualizado exitosamente');
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
            Editar Campo
          </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Editar Campo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Editar Campo
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
