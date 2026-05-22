import { Search, Bell, User } from "lucide-react";
import { Input } from "@/shared/ui/Input";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-300 bg-white px-8 shadow-sm">
      <div className="flex items-center">
        <span className="text-sm font-semibold text-neutral-500">
          Visão Geral / <span className="text-neutral-900">Dashboard Nacional</span>
        </span>
      </div>
      
      <div className="flex w-full max-w-md items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input 
            type="text" 
            placeholder="Buscar município ou escola..." 
            className="pl-10 bg-neutral-100 border-transparent focus-visible:bg-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical-500 ring-2 ring-white"></span>
        </button>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-colors hover:bg-primary-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
