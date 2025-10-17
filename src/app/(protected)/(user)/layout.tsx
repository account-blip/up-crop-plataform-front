
import { AppNavbar } from '@/components/navegation/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      < AppNavbar>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="w-full min-h-[calc(100dvh-4rem)] pb-10">{children}</main>
      </div>
      </AppNavbar>
    </SidebarProvider>
  );
}
