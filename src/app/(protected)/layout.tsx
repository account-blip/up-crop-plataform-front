import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
        <div className="flex flex-col w-full min-h-screen overflow-y-auto">
          {children}
        </div>
    </SessionProvider>
  );
}
