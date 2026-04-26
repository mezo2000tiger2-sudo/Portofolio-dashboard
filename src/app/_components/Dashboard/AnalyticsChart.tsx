"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle ,} from '@/components/ui/card'
import { data } from '@/data/AnalyticsData'
import React from 'react'
import { Line, LineChart, ResponsiveContainer , CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function AnalyticsChart() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">Analytics Overview</CardTitle>
        <CardDescription>Monthly traffic views and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey='name' 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--foreground)'
                }}
                itemStyle={{ color: 'var(--primary)' }}
              />
              <Line 
                type='monotone' 
                dataKey='uv' 
                stroke='var(--primary)' 
                strokeWidth={2}
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type='monotone' 
                dataKey='pv' 
                stroke='var(--muted-foreground)' 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
