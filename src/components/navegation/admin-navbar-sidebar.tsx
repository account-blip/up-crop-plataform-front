'use client';

import {
  CreditCardIcon,
  HandCoins,
  Home,
  HelpCircle,
  User2,
  Scale,
  BarChart,
  UserCheck,
  ArrowLeft,
  Globe,
  User,
  Wallet,
  Banknote,
  ParkingCircle,
  Ticket,
  DollarSignIcon,
  MapPinHouseIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';

export const adminNavItems = [
  {
    title: 'Campos',
    url: '/admin/campos',
    icon: <MapPinHouseIcon />,
  },
  {
    title: 'Volver',
    url: '/home',
    icon: <ArrowLeft />,
  },
];

export function AdminNavbarSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="group/sidebar border-r bg-background overflow-hidden"
      {...props}
    >
      <SidebarHeader className="h-16 border-b flex justify-center items-center bg-background">
        <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 hover:text-white transition-all duration-200" />
      </SidebarHeader>
      <SidebarContent className="py-1 bg-background overflow-hidden">
        <NavMain items={adminNavItems} />
      </SidebarContent>
      <SidebarRail className="after:bg-border after:opacity-50 hover:after:opacity-100 after:transition-opacity" />
    </Sidebar>
  );
}
