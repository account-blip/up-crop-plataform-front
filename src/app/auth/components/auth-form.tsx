"use client"

import { useState, useTransition, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, UserCircle, EyeOff, Eye } from "lucide-react"
import { loginAction } from "@/actions/auth/login.action"
import { useSearchParams, useRouter } from 'next/navigation';
import { LoginSchemaType } from "@/schemas/auth/login.schema"
import { loginSchema } from "@/schemas/auth/login.schema"
import { registerSchema, RegisterSchemaType } from "@/schemas/auth/register.schema"
import { registerAction } from "@/actions/auth/register.action"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { CardWrapper } from "@/components/auth/card-wrapper"
import Link from "next/link"
import { Campo } from "@/types/campo.type"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_ROLES, UserRole } from "@/types/user.type"

interface AuthFormProps {
  mode?: 'login' | 'register'
  campos?: Campo[]
}

export function AuthForm({ mode = 'login', campos }: AuthFormProps) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl');
    const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
        ? 'Por favor inicia sesión con tu cuenta de Google'
        : '';
    const [isLogin, setIsLogin] = useState(mode === 'login')
    const [isAnimating, setIsAnimating] = useState(false)
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Update isLogin when mode prop changes with animation
    useEffect(() => {
        const newIsLogin = mode === 'login'
        
        if (isLogin !== newIsLogin) {
            // Start the animation sequence
            setIsAnimating(true)
            
            // Change the form immediately for smooth transition
            setIsLogin(newIsLogin)
            
            // End the animation after transition completes
            const timer = setTimeout(() => {
                setIsAnimating(false)
            }, 500) // Match the CSS transition duration
            
            return () => clearTimeout(timer)
        }
    }, [mode, isLogin])

    // Initial animation on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false)
        }, 100)
        
        return () => clearTimeout(timer)
    }, [])

    const loginForm = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
        identifier: '',
        password: '',
        },
    });
    const onLoginSubmit  = (values: LoginSchemaType) => {
        setError(undefined);
        setSuccess(undefined);
      
        startTransition(() => {
          loginAction(values, callbackUrl || '')
            .then((data) => {
      
              if (data?.error) {
                setError(data.error);
              }
              if (data?.success) {
                setSuccess(data.success);
                router.push(data.redirectTo || '/');
              }
            })
            .catch((error) => {
              console.error("⚠️ Error en loginAction:", error);
              setError('Algo salió mal. Por favor intenta de nuevo.');
            });
        });
      };

  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      campoId: "",
      role: USER_ROLES[1],
      password: "",
      confirmPassword: "",
    },
  })

  const onRegisterSubmit = (values: RegisterSchemaType) => {
    setError(undefined);
    setSuccess(undefined);
    console.log(values)

    startTransition(() => {
      registerAction({ values, isVerified: false })
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }
          if (data?.success) {
            setSuccess(data.success);
            // Redirigir al login si el registro fue exitoso
            router.push(data.redirectTo || '/auth/login');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Error al registrar usuario');
        });
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className={`bg-card rounded-2xl shadow-lg p-6 border-2 border-primary/20 flex flex-col ${
          isLogin ? "h-auto min-h-[400px]" : "h-[600px]"
        }`}>
          {/* Header */}
          <div className="text-center mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">{isLogin ? "Bienvenido" : "Crear Cuenta"}</h1>
            <p className="text-muted-foreground">
              {isLogin ? "Ingresa tus credenciales para continuar" : "Completa el formulario para registrarte"}
            </p>
          </div>

          {/* Forms Container with Animation */}
          <div className={`relative flex-1 bg-gradient-to-r from-transparent via-background/5 to-transparent ${
            !isLogin 
              ? "overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30" 
              : "flex items-center justify-center"
          }`}>
            {/* Login Form */}
            <div
              className={`transition-all duration-500 ease-in-out transform w-full ${
                isLogin
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-full scale-95 absolute inset-0 pointer-events-none"
              }`}
            >
            <CardWrapper
                showSocials
                >
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                {/* Identifier Field */}
                <div className="space-y-2">
                  <Label htmlFor="identifier" className="text-foreground">
                    Email o Usuario
                  </Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="identifier"
                      {...loginForm.register("identifier")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="tu@email.com o usuario"
                    />
                  </div>
                  {loginForm.formState.errors.identifier && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.identifier.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      {...loginForm.register("password")}
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
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    asChild
                    size="sm"
                    variant="link"
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">Olvidaste tu contraseña?</Link>
                  </Button>
                </div>

                {/* Submit Button */}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={!loginForm.formState.isValid}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Iniciar sesión
                </Button>
              </form>
              </CardWrapper>
            </div>

            {/* Register Form */}
            <div
              className={`transition-all duration-500 ease-in-out transform w-full ${
                !isLogin
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-full scale-95 absolute inset-0 pointer-events-none"
              }`}
            >
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-3 pl-1">
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
                      {...registerForm.register("email")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
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
                      {...registerForm.register("username")}
                      className="pl-10 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="usuario123"
                    />
                  </div>
                  {registerForm.formState.errors.username && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
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
                      {...registerForm.register("firstName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="Juan"
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-foreground">
                      Apellido
                    </Label>
                    <Input
                      id="lastName"
                      {...registerForm.register("lastName")}
                      className="border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12"
                      placeholder="Pérez"
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="campoId" className="text-foreground">
                      Seleccione el Campo al que pertenece
                    </Label>
                    <div className="relative">
                    <Controller
                    name="campoId"
                    control={registerForm.control}
                    render={({ field }) => (
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(String(value))}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Selecciona un campo" />
                        </SelectTrigger>
                        <SelectContent>
                          {campos?.map((campo) => (
                            <SelectItem key={campo.id} value={String(campo.id)}>
                              {campo.nombre}
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
                        {...registerForm.register("role")}
                        onValueChange={(value) => registerForm.setValue("role", value as UserRole)}
                      >
                        <SelectTrigger className="pl-4 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_ROLES.filter((r) => r !== "ADMIN").map((role) => (
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
                      {...registerForm.register("password")}
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
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
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
                      {...registerForm.register("confirmPassword")}
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
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={!registerForm.formState.isValid}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Registrarse
                </Button>
              </form>
            </div>
          </div>

          {/* Toggle Link */}
          <div className="mt-4 text-center pt-4 border-t border-border/50 flex-shrink-0">
            <button
              type="button"
              onClick={() => router.push(isLogin ? '/auth/register' : '/auth/login')}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              {isLogin ? (
                <>
                  ¿No tienes cuenta? <span className="underline">Regístrate</span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta? <span className="underline">Inicia sesión</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
