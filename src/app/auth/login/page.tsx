import { Suspense } from "react";
import { AuthForm } from "../components/auth-form";
export const dynamic = "force-dynamic";
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
