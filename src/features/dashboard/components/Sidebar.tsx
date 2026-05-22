import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Map, Trophy, FileCheck, School, Settings, BookOpen } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard Nacional", active: true },
  { icon: Map, label: "Mapa de Vulnerabilidade" },
  { icon: Trophy, label: "Rankings Municipais" },
  { icon: FileCheck, label: "Conformidade Legal" },
  { icon: School, label: "Perfil de Escola" },
];

const secondaryItems = [
  { icon: BookOpen, label: "Documentação IVEB" },
  { icon: Settings, label: "Configurações" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[280px] flex-col border-r border-neutral-300 bg-white">
      <div className="flex h-20 items-center px-6 pt-2">
        <Image 
          src="/LogoEduVita.png" 
          alt="EduVita Logo" 
          width={140} 
          height={40} 
          className="object-contain" 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                item.active 
                  ? "bg-primary-050 text-primary-700 border-l-[3px] border-primary-700" 
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-8">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Sistema
          </div>
          <nav className="space-y-1">
            {secondaryItems.map((item) => (
              <Link
                key={item.label}
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
