import { getEmpresas } from '@/services/empresa.service'
import { AuthForm } from '../components/auth-form'

export default async function RegisterPage() {
  const empresas = await getEmpresas()

  return <AuthForm mode="register" empresas={empresas?.data || []} />
}






