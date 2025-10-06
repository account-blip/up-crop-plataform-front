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
        <div className="flex flex-col w-full h-[100dvh] overflow-hidden">
          {children}
        </div>
    </SessionProvider>
  );
}
