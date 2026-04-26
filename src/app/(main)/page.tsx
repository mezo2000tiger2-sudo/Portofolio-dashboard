"use client"

import { useQuery } from "@tanstack/react-query"
import { MessageCircle, Newspaper, User } from 'lucide-react'
import DashboardCard from "../_components/Dashboard/DashboardCard"
import PostTable from "../_components/posts/PostTable"
import AnalyticsChart from "../_components/Dashboard/AnalyticsChart"
import RecentActivity from "../_components/Dashboard/RecentActivity"

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
      
      <div className="grid gap-4">
        <PostTable limit={5} title="Latest Posts" />
      </div>
    </div>
  )
}
