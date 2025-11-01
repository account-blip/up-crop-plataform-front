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
import { AnalisisDeCalidad } from '@/types/analisis-de-calidad/analisis-de-calidad.type';
import {
  deleteAnalisisDeCalidadSchema,
  DeleteAnalisisDeCalidadSchemaType,
} from '@/schemas/analisis-de-calidad/analisis-de-calidad.schema';
import { deleteAnalisisDeCalidadAction } from '@/actions/analisis-de-calidad/delete-analisis-de-calidad.action';

const DELETE_ANALISIS_TEXT = 'Eliminar Análisis';

export function DeleteAnalisisDeCalidadDialog({
  analisisDeCalidad,
}: {
  analisisDeCalidad: AnalisisDeCalidad;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteAnalisisDeCalidadSchemaType>({
    resolver: zodResolver(deleteAnalisisDeCalidadSchema),
    defaultValues: {
      confirmation: '',
    },
  });

  const onSubmit = (values: DeleteAnalisisDeCalidadSchemaType) => {
    if (values.confirmation !== DELETE_ANALISIS_TEXT) {
      toast.error('El texto de confirmación no coincide.');
      return;
    }

    startTransition(() => {
      deleteAnalisisDeCalidadAction(analisisDeCalidad.id).then((data) => {
        if (!data || data.error) {
          toast.error(data?.error || 'Error al eliminar el análisis.');
        } else {
          toast.success(data.success || 'Análisis eliminado correctamente.');
          form.reset();
          setOpen(false);
        }
      });
    });
  };

  return (
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
          <DialogTitle>Eliminar Análisis de Calidad</DialogTitle>
          <DialogDescription>
            Ingrese <strong>{DELETE_ANALISIS_TEXT}</strong> para confirmar.
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
                      placeholder={DELETE_ANALISIS_TEXT}
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
                variant="destructive"
                size="sm"
                disabled={isPending}
              >
                {isPending ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
