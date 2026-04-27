import React from 'react'
import { LucideIcon, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface DashboardCardProps {
  title?: string
  count?: number
  icon?: React.ReactElement<LucideIcon>
  isLoading?: boolean
  isError?: boolean
}

export default function DashboardCard({ title, count, icon, isLoading, isError }: DashboardCardProps) {
  return (
    <Card className="flex-1 overflow-hidden transition-all hover:shadow-md border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          <div className="text-muted-foreground opacity-70">
            {icon && React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
          </div>
        </div>
        <div className="mt-2">
          {isLoading ? (
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
          ) : isError ? (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle size={16} />
              <span className="text-xs font-medium">Error</span>
            </div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">
                {count?.toLocaleString()}
              </h3>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Total active {title?.toLowerCase()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
