'use client';

import {
  ArrowLeft,
  MapPinHouseIcon,
  AlignHorizontalJustifyCenter,
  HousePlusIcon,
  BoxIcon,
  Users2
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { currentUser } from '@/lib/auth';
import { useSession } from 'next-auth/react';

export const adminNavItems = [
  {
    title: 'Empresas',
    url: '/admin/empresas',
    icon: <MapPinHouseIcon />,
    roles: ['SUPERADMIN'],
    
  },
  {
    title: 'Unidades Productivas',
    url: '/admin/unidades-productivas',
    icon: <AlignHorizontalJustifyCenter />,
    roles: ['ADMIN', 'SUPERADMIN'],
  },
  {
    title: 'Cuarteles',
    url: '/admin/cuarteles',
    icon: <HousePlusIcon />,
    roles: ['ADMIN', 'SUPERADMIN'],
  },
  {
    title: 'Variedades',
    url: '/admin/variedades',
    icon: <BoxIcon />,
    roles: ['ADMIN', 'SUPERADMIN'],
  },
  {
    title: 'Usuarios',
    url: '/admin/users',
    icon: <Users2 />,
    roles: ['SUPERADMIN'],
    
  },
  {
    title: 'Volver',
    url: '/home',
    icon: <ArrowLeft />,
    roles: ['ADMIN', 'SUPERADMIN'],
  },
];


export function AdminNavbarSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const filteredItems = adminNavItems.filter(item =>
    item.roles.includes(session?.user.role ?? 'ADMIN')
  )

  return (
    <Sidebar
      collapsible="icon"
      className="group/sidebar border-r overflow-hidden bg-gradient-to-b from-[#0a0e2e] via-[#0b1344] to-[#0f184f]"
      {...props}
    >
      <SidebarHeader className="h-16 border-b flex justify-center items-center bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/10">
        <SidebarTrigger className="h-9 w-9 cursor-pointer rounded-lg bg-white/5 hover:bg-white/10 hover:shadow hover:shadow-blue-500/20 transition-all duration-200" />
      </SidebarHeader>
      <SidebarContent className="py-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(80%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
        <NavMain items={filteredItems} />
      </SidebarContent>
      <SidebarRail className="after:bg-white/10 after:opacity-50 hover:after:opacity-100 after:transition-opacity" />
    </Sidebar>
  )
}