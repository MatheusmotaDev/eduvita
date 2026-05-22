import { Card, CardContent } from "@/shared/ui/Card";
import { cn } from "@/shared/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

export type KPITrend = 'up' | 'down' | 'neutral';
export type KPIStatus = 'critical' | 'warning' | 'success' | 'neutral';

interface KPICardProps {
  title: string;
  value: string | number;
  trendValue?: string;
  trend?: KPITrend;
  context?: string;
  icon: LucideIcon;
  status: KPIStatus;
}

const statusConfig = {
  critical: { card: "border-l-critical-500", icon: "bg-critical-100 text-critical-700" },
  warning: { card: "border-l-warning-500", icon: "bg-warning-100 text-warning-700" },
  success: { card: "border-l-secondary-500", icon: "bg-secondary-100 text-secondary-700" },
  neutral: { card: "border-l-neutral-300", icon: "bg-neutral-100 text-neutral-500" },
};

export function KPICard({ title, value, trendValue, trend, context, icon: Icon, status }: KPICardProps) {
  return (
    <Card className={cn("border-l-[4px] border-transparent relative overflow-hidden", statusConfig[status].card)}>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className={cn("p-1.5 rounded-md", statusConfig[status].icon)}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-neutral-700">{title}</span>
        </div>
        
        <div className="flex items-end gap-3 mb-1">
          <span className="font-display text-2xl font-bold tracking-tight text-neutral-900">{value}</span>
          
          {trendValue && (
            <div className={cn(
              "flex items-center text-xs font-semibold pb-1",
              trend === 'up' ? "text-secondary-500" : trend === 'down' ? "text-critical-500" : "text-neutral-500"
            )}>
              {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
              {trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        
        {context && <p className="text-xs text-neutral-500">{context}</p>}
      </CardContent>
    </Card>
  );
}
