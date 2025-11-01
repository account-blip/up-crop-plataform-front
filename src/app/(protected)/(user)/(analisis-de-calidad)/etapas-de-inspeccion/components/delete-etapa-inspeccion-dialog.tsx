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
import { Trash2 } from 'lucide-react';
import { EtapaInspeccion } from '@/types/analisis-de-calidad/etapa-inspeccion.type';
import { deleteEtapaInspeccionSchema, DeleteEtapaInspeccionSchemaType } from '@/schemas/analisis-de-calidad/etapa-inspeccion.schema';
import { deleteEtapaInspeccionAction } from '@/actions/etapa-inspeccion/delete-etapa-inspeccion.action';

const DELETE_ETAPA_TEXT = 'Eliminar Etapa';

export function DeleteEtapaInspeccionDialog({ EtapaInspeccion }: { EtapaInspeccion: EtapaInspeccion }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteEtapaInspeccionSchemaType>({
    resolver: zodResolver(deleteEtapaInspeccionSchema),
    defaultValues: {
      confirmation: '',
    },
  });

  const onSubmit = (values: DeleteEtapaInspeccionSchemaType) => {
    if (
      values.confirmation !== DELETE_ETAPA_TEXT
    ) {
      toast.error('Los detalles de confirmación no coinciden.');
      return;
    }

    startTransition(() => {
      deleteEtapaInspeccionAction(EtapaInspeccion.id).then((data) => {
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
            <DialogTitle>Eliminar Etapa de Inspeccion</DialogTitle>
            <DialogDescription>
              Ingrese {DELETE_ETAPA_TEXT} para confirmar.
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
                        placeholder={DELETE_ETAPA_TEXT}
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
