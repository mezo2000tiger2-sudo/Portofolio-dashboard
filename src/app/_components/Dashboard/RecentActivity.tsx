"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CommentsResponse, Comment } from '@/types/Comment'
import { Clock, AlertCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const fetchRecentComments = async (): Promise<CommentsResponse> => {
  const res = await fetch("https://dummyjson.com/comments?limit=5&sortBy=likes&order=desc")
  if (!res.ok) throw new Error("Failed to fetch comments")
  return res.json()
}

// Vanilla JS helper for relative time (Task 6)
function getRelativeTime(id: number) {
  // DummyJSON comments don't have dates, so we simulate based on ID
  const now = Date.now()
  const minutesAgo = (id % 60) + 1
  const diff = minutesAgo * 60 * 1000
  const date = new Date(now - diff)
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  return rtf.format(-minutesAgo, 'minute')
}

export default function RecentActivity() {
  const { data: commentsData, isLoading, isError, error } = useQuery<CommentsResponse>({
    queryKey: ["recent-comments"],
    queryFn: fetchRecentComments,
  })

  const comments = commentsData?.comments || []

  if (isError) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 shadow-sm h-full">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-3" />
          <p className="text-sm font-medium text-destructive">Failed to load activity</p>
          <p className="text-xs text-destructive/80 mt-1">{error?.message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">Recent Activity</CardTitle>
        <CardDescription>Latest community interactions and comments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comments.map((comment: Comment) => (
            <div key={comment.id} className="flex gap-4 relative">
              <div className="relative">
                <Avatar className="h-9 w-9 border border-border z-10 relative bg-background">
                  <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                    {comment.user.fullName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground truncate">
                    {comment.user.fullName}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="h-2.5 w-2.5" />
                    {getRelativeTime(comment.id)} {/* Task 6: replace hardcoded '2h ago' */}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 italic">
                  "{comment.body}"
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-muted px-2 py-0.5 rounded text-[10px] text-muted-foreground font-medium">
                    Post #{comment.postId}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    👍 {comment.likes} likes
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-full bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))
          )}

          {!isLoading && comments.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-10">No recent activity found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
