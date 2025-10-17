import { getCampos } from '@/services/campo.service'
import { AuthForm } from '../components/auth-form'

export default async function RegisterPage() {
  const campos = await getCampos()

  return <AuthForm mode="register" campos={campos?.data || []} />
}






