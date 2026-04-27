"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MessageCircle, Newspaper, User, ArrowUpDown, TrendingUp, ThumbsUp, Type, Clock } from 'lucide-react'
import DashboardCard from "../_components/Dashboard/DashboardCard"
import PostTable from "../_components/posts/PostTable"
import AnalyticsChart from "../_components/Dashboard/AnalyticsChart"
import RecentActivity from "../_components/Dashboard/RecentActivity"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const fetchPosts = () =>
  fetch("https://dummyjson.com/posts").then(r => r.json())

const fetchUsers = () =>
  fetch("https://dummyjson.com/users").then(r => r.json())

const fetchComments = () =>
  fetch("https://dummyjson.com/comments").then(r => r.json())

export default function Home() {
  const { data: postsData, isLoading: postsLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts })
  const { data: usersData, isLoading: usersLoading } = useQuery({ queryKey: ["users"], queryFn: fetchUsers })
  const { data: commentsData, isLoading: commentsLoading } = useQuery({ queryKey: ["comments"], queryFn: fetchComments })

  const sortOptions = [
    { key: 'reactions', order: 'desc', label: 'Most Liked', icon: <ThumbsUp className="mr-2 h-4 w-4" /> },
    { key: 'id', order: 'desc', label: 'Latest', icon: <Clock className="mr-2 h-4 w-4" /> },
    { key: 'title', order: 'asc', label: 'Alphabetical', icon: <Type className="mr-2 h-4 w-4" /> },
  ]

  const [sortConfig, setSortConfig] = useState(sortOptions[0])

  const cards = [
    {
      title: "Posts",
      count: postsData?.total,
      icon: <Newspaper className="text-muted-foreground" />,
      isLoading: postsLoading,
    },
    {
      title: "Users",
      count: usersData?.total,
      icon: <User className="text-muted-foreground" />,
      isLoading: usersLoading,
    },
    {
      title: "Comments",
      count: commentsData?.total,
      icon: <MessageCircle className="text-muted-foreground" />,
      isLoading: commentsLoading,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            count={card.count}
            icon={card.icon}
            isLoading={card.isLoading}
          />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold tracking-tight">Top Content</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort By: {sortConfig.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.label} 
                  onClick={() => setSortConfig(option)}
                  className="cursor-pointer"
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <PostTable 
          limit={5} 
          sortBy={sortConfig.key} 
          order={sortConfig.order} 
        />
      </div>
    </div>
  )
}
