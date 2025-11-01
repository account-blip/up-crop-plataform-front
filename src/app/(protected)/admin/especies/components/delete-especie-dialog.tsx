'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Variedad } from '@/types/variedad.type';
import { DeleteVaridadSchemaType, deleteVariedadSchema } from '@/schemas/variedad.schema';
import { deleteVariedadAction } from '@/actions/variedad/delete-variedad.action';
import { Trash2 } from 'lucide-react';
import { Especie } from '@/types/especie.type';
import { deleteEspecieSchema, DeleteEspecieSchemaType } from '@/schemas/especie.schema';
import { deleteEspecieAction } from '@/actions/especie/delete-especie.action';

const DELETE_ESPECIE_TEXT = 'Eliminar Especie';

export function DeleteEspecieDialog({ especie }: { especie: Especie }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteEspecieSchemaType>({
    resolver: zodResolver(deleteEspecieSchema),
    defaultValues: {
      confirmation: '',
    },
  });

  const onSubmit = (values: DeleteEspecieSchemaType) => {
    if (
      values.confirmation !== DELETE_ESPECIE_TEXT
    ) {
      toast.error('Los detalles de confirmación no coinciden.');
      return;
    }

    startTransition(() => {
      deleteEspecieAction(especie.id).then((data) => {
        if (!data || data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success);
          form.reset();
          setOpen(false);
        }
      });
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Especie</DialogTitle>
            <DialogDescription>
              Ingrese {DELETE_ESPECIE_TEXT} para confirmar.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmación</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder={DELETE_ESPECIE_TEXT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={isPending}
                >
                  Eliminar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
