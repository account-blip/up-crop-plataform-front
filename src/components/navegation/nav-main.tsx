'use client';

import React from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon | React.ReactNode | (() => React.JSX.Element);
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = mounted && pathname === item.url;
          const hasActiveChild =
            mounted && item.items?.some((subItem) => pathname === subItem.url);

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className="group relative flex w-full items-center rounded-md px-2 py-7 text-sm font-medium transition-all duration-200 hover:bg-black/5 group-[[data-collapsible=icon]]/sidebar:justify-center text-black"
                >
                  <Link
                    href={item.url}
                    className="flex items-center w-full gap-x-3 group-[[data-collapsible=icon]]/sidebar:justify-center"
                  >
                    {item.icon && (
                      <div className="flex h-5 w-5 items-center justify-center text-black/70 transition-transform duration-200 group-hover:scale-110">
                        {typeof item.icon === 'function'
                          ? item.icon({})
                          : item.icon}
                      </div>
                    )}
                    <span className="truncate group-[[data-collapsible=icon]]/sidebar:hidden text-black">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={hasActiveChild}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={hasActiveChild}
                    className="group relative flex items-center rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-black/5 data-[active=true]:bg-black/10 text-black group-[[data-collapsible=icon]]/sidebar:justify-center"
                  >
                    {item.icon && (
                      <div className="flex h-7 w-5 items-center justify-center text-black/70 group-data-[active=true]:text-black transition-transform duration-200 group-hover:scale-110">
                        {typeof item.icon === 'function'
                          ? item.icon({})
                          : item.icon}
                      </div>
                    )}
                    <span className="ml-2 truncate group-[[data-collapsible=icon]]/sidebar:hidden text-black group-hover:text-black">
                      {item.title}
                    </span>
                    <ChevronRight className="ml-auto h-5 w-5 shrink-0 transition-all duration-200 text-black/60 group-hover:text-black group-data-[state=open]/collapsible:rotate-90 group-[[data-collapsible=icon]]/sidebar:hidden" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="animate-accordion-down group-[[data-collapsible=icon]]/sidebar:hidden">
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={mounted && pathname === subItem.url}
                          className="group flex w-full items-center rounded-md px-4 py-2 pl-12 text-sm font-medium transition-all duration-200 hover:bg-black/5 hover:text-black text-black"
                        >
                          <Link href={subItem.url}>
                            <span className="truncate">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
