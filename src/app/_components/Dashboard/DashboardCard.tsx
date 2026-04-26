import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'

interface DashboardCardProps {
  title?: string
  count?: number
  icon?: React.ReactElement<LucideIcon>
  isLoading?: boolean
}

export default function DashboardCard({ title, count, icon, isLoading }: DashboardCardProps) {
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