import { Card, CardContent, CardDescription, CardHeader, CardTitle ,} from '@/components/ui/card'
import { data } from '@/data/AnalyticsData'
import { Monoton } from 'next/font/google'
import React from 'react'
import { Line, LineChart, ResponsiveContainer , CartesianGrid, XAxis, YAxis } from 'recharts'

export default function AnalyticsChart() {
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Analytics for this year</CardTitle>
                <CardDescription>Views per month</CardDescription>
                <CardContent>
                    <div className="w-full h-75">
                        <ResponsiveContainer>
                            <LineChart width={1100} height={300} data={data}>
                                <Line type='monotone' dataKey='uv' stroke='#8884d8'></Line>
                                <Line type='monotone' dataKey='pv' stroke='#82ca9d'></Line>
                                <CartesianGrid stroke='#ccc'/>
                                <XAxis dataKey='name' />
                                <YAxis />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    </>
  )
}
