'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
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
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { registerSchema, RegisterSchemaType } from '@/schemas/auth/register.schema';
import { registerAction } from '@/actions/auth/register.action';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_ROLES, UserRole } from "@/types/user.type"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Label } from "@/components/ui/label"
import { Empresa } from '@/types/empresa.type';


export function CreateUserDialog({empresas}:{empresas:Empresa[]}) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
      defaultValues: {
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        empresaId: "",
        role: USER_ROLES[1],
        password: "",
        confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterSchemaType) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      registerAction({ values, isVerified: false })
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          toast.success('Usuario creado exitosamente');
          setOpen(false);
        })
        .catch((error) => {
          console.error(error);
          setError('Error al registrar usuario');
          toast.error(error);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          Crear Usuario
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] sm:max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Crear Usuario</DialogTitle>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Email Field */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Username Field */}
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-foreground">
                    Nombre de Usuario
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      {...form.register("username")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="usuario123"
                    />
                  </div>
                  {form.formState.errors.username && (
                    <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>
                  )}
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-foreground">
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="Juan"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-foreground">
                      Apellido
                    </Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="Pérez"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="campoId" className="text-foreground">
                      Seleccione el Campo al que pertenece
                    </Label>
                    <div className="relative">
                    <Controller
                    name="empresaId"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(String(value))}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Selecciona un campo" />
                        </SelectTrigger>
                        <SelectContent>
                          {empresas?.map((empresa) => (
                            <SelectItem key={empresa.id} value={String(empresa.id)}>
                              {empresa.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                    </div>
                  </div>


                <div className="space-y-1">
                    <Label htmlFor="role" className="text-foreground">
                      Rol
                    </Label>
                    <div className="relative">
                    <Select
                        {...form.register("role")}
                        onValueChange={(value) => form.setValue("role", value as UserRole)}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>


                {/* Password Fields */}
                <div className="space-y-1">
                  <Label htmlFor="register-password" className="text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      {...form.register("password")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...form.register("confirmPassword")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="••••••••"
                    />
                     <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Crear
                </Button>
              </form>
      </Form>
      </DialogContent>
    </Dialog>
  );
}

