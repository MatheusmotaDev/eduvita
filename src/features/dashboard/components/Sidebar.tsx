"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Map, Trophy, FileCheck, School, Settings, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard Nacional", href: "/" },
  { icon: Map, label: "Mapa de Vulnerabilidade", href: "/mapa" },
  { icon: Trophy, label: "Rankings Municipais", href: "/rankings" },
  { icon: FileCheck, label: "Conformidade Legal", href: "/conformidade" },
  { icon: School, label: "Perfil de Escola", href: "/escolas" },
  { icon: AlertCircle, label: "Ouvidoria (Alertas)", href: "/denuncias" },
];

const secondaryItems = [
  { icon: BookOpen, label: "Documentação IVEB", href: "/docs/iveb" },
  { icon: Settings, label: "Configurações", href: "#" },
];

export function Sidebar({ isOpen = false, onClose = () => {} }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay escuro no mobile quando aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar com transição */}
      <aside className={cn(
        "fixed left-0 top-0 z-30 flex h-screen w-[280px] flex-col border-r border-neutral-300 bg-white transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      <div className="flex h-20 items-center px-6 pt-2">
        <Link href="/">
          <Image 
            src="/LogoEduVita.png" 
            alt="EduVita Logo" 
            width={140} 
            height={40} 
            className="object-contain" 
          />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                  isActive 
                    ? "bg-primary-050 text-primary-700 border-l-[3px] border-primary-700" 
                    : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-8">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Sistema
          </div>
          <nav className="space-y-1">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                    isActive 
                      ? "bg-primary-050 text-primary-700 border-l-[3px] border-primary-700" 
                      : "text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      </aside>
    </>
  );
}
