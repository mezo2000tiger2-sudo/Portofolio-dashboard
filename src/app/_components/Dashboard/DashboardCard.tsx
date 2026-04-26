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
    <Card className="bg-slate-100 dark:bg-slate-900 p-4 flex-1">
      <CardContent>
        <h3 className="text-3xl text-center font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center mt-2">
          {icon}
          {isLoading ? (
            <Spinner className='size-12 text-slate-600 dark:text-slate-300' />
          ) : (
            <h3 className="text-5xl font-semibold text-slate-500 dark:text-slate-200">
              {count}
            </h3>
          )}
        </div>
      </CardContent>
    </Card>
  )
}