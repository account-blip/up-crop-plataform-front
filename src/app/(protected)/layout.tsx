import { auth } from '@/auth'
import { Sidebar } from '@/components/navegation/sidebar'
import { SessionProvider } from 'next-auth/react'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const role = session?.user.role.toLowerCase()

  return (
    <SessionProvider session={session}>
      <div className="flex">
        <Sidebar userRole={role as 'admin' | 'superadmin' | 'user'} />
        <div className="ml-64 flex-1 min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}
