"use client"

import { useQuery } from "@tanstack/react-query"
import { MessageCircle, Newspaper, User } from 'lucide-react'
import DashboardCard from "./_components/Dashboard/DashboardCard"
import PostTable from "./_components/Dashboard/PostTable"
import AnalyticsChart from "./_components/Dashboard/AnalyticsChart"

const fetchPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())

const fetchUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json())

const fetchComments = () =>
  fetch("https://jsonplaceholder.typicode.com/comments").then(r => r.json())

export default function Home() {
  const { data: posts, isLoading: postsLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts })
  const { data: users, isLoading: usersLoading } = useQuery({ queryKey: ["users"], queryFn: fetchUsers })
  const { data: comments, isLoading: commentsLoading } = useQuery({ queryKey: ["comments"], queryFn: fetchComments })

  const cards = [
    {
      title: "Posts",
      count: posts?.length,
      icon: <Newspaper className="text-slate-500 dark:text-slate-200" size={72} />,
      isLoading: postsLoading,
    },
    {
      title: "Users",
      count: users?.length,
      icon: <User className="text-slate-500 dark:text-slate-200" size={72} />,
      isLoading: usersLoading,
    },
    {
      title: "Comments",
      count: comments?.length,
      icon: <MessageCircle className="text-slate-500 dark:text-slate-200" size={72} />,
      isLoading: commentsLoading,
    },
  ]

  return (
    <>
    <div className="flex flex-col md:flex-row gap-5 mb-5">
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
    <AnalyticsChart/>
    <PostTable limit={5}/>
    </>
  )
}