'use client';

import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { useState } from 'react';
import {
  updateProfilePassword,
  UpdateProfilePasswordType,
  UpdateProfileSchemaType,
  updateProfileSchema,
} from '@/schemas/user.schema';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from '@/actions/users/update-password.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserByUsername } from '@/services/users.service';
import { updateUserAction } from '@/actions/users/update-user.action';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User } from '@/types/user.type';
import { Eye, EyeOff, Mail, User2, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { USER_ROLES, UserRole } from '@/types/user.type';
import { Label } from '@/components/ui/label';
import { Empresa } from '@/types/empresa.type';
import {
  Form,
} from '@/components/ui/form';

export function UpdateUserDailog({ user, empresas }: { user: User, empresas: Empresa[] }) {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [open, setOpen] = useState(false);
  let debounceTimeout: NodeJS.Timeout | null = null;
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const form = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      role: user?.role || USER_ROLES[1],
      empresaId: String(user?.empresa?.id ?? ''),
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<UpdateProfilePasswordType>({
    resolver: zodResolver(updateProfilePassword),
    defaultValues: {
      currentPassword: '',
      repeatNewPassword: '',
      newPassword: '',
    },
  });

  if (!user) return <div>No estás autenticado.</div>;
  if (session.status === 'loading') return <div>Cargando...</div>;

  const checkUsername = async (username: string) => {
    setIsCheckingUsername(true);
    try {
      const exists = await getUserByUsername(username, session.data?.token);

      if (exists && exists.username !== user.username) {
        setUsernameExists(true);
      } else {
        setUsernameExists(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error verificando el username:', error.message);
      }
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value.trim();
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (username === '') {
        setUsernameExists(false);
        return;
      }
      checkUsername(username);
    }, 1500);
  };

  const onSubmitProfile = async (values: UpdateProfileSchemaType) => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const result = await updateUserAction(user.id, values);
      if (result.error) {
        toast.error(typeof result.error === 'string' ? result.error : result.error.message);
      } else if (result.success) {
        toast.success('Perfil actualizado exitosamente');
        router.refresh();
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      toast.error('Ocurrió un error inesperado. Por favor, inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (values: UpdateProfilePasswordType) => {
    try {
      setIsLoading(true);
      const result = await updatePassword(user.id, values);
      if (result.error) {
        toast.error(typeof result.error === 'string' ? result.error : result.error.message);
      } else if (result.success) {
        toast.success('Contraseña actualizada exitosamente. Inicie sesión nuevamente.');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      toast.error('Ocurrió un error inesperado. Por favor, inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Editar Usuario
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto w-full max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Actualizar Perfil</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Cuenta</TabsTrigger>
            <TabsTrigger value="password">Contraseña</TabsTrigger>
          </TabsList>

          {/* ====================== CUENTA ====================== */}
          <TabsContent value="account">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-5 py-4">
                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm text-white/90">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-sm text-white/90">Nombre de Usuario</Label>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      {...form.register("username")}
                      onChange={onUsernameChange}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                      placeholder="usuario123"
                    />
                  </div>
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-sm text-white/90">Nombre</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                      placeholder="Juan"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-sm text-white/90">Apellido</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                      placeholder="Pérez"
                    />
                  </div>
                </div>

                {/* Campo (empresa) */}
                <div className="space-y-1">
                  <Label htmlFor="empresaId" className="text-sm text-white/90">Seleccione el Campo</Label>
                  <Controller
                    name="empresaId"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(String(value))}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white">
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

                {/* Rol */}
                <div className="space-y-1">
                  <Label htmlFor="role" className="text-sm text-white/90">Rol</Label>
                  <Select
                    value={form.watch("role")}
                    onValueChange={(value) => form.setValue("role", value as UserRole)}
                  >
                    <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white">
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

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Actualizar
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* ====================== CONTRASEÑA ====================== */}
          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                className="space-y-4 py-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="currentPassword" className="text-sm text-white/90">Contraseña actual</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...passwordForm.register("currentPassword")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="newPassword" className="text-sm text-white/90">Contraseña nueva</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...passwordForm.register("newPassword")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="repeatNewPassword" className="text-sm text-white/90">Repetir contraseña nueva</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="repeatNewPassword"
                      type={showRepeatNewPassword ? "text" : "password"}
                      {...passwordForm.register("repeatNewPassword")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12 placeholder:text-white/60 text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowRepeatNewPassword(!showRepeatNewPassword)
                      }
                    >
                      {showRepeatNewPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Actualizando..." : "Actualizar contraseña"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
