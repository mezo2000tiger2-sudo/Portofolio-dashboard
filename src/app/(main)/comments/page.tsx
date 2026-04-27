"use client"

import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Comment, CommentsResponse } from '@/types/Comment'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ArrowUpDown, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const fetchComments = async (limit: number, skip: number, sortBy: string, order: string): Promise<CommentsResponse> => {
  const res = await fetch(`https://dummyjson.com/comments?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`)
  if (!res.ok) throw new Error("Failed to fetch comments")
  return res.json()
}

export default function CommentsPage() {
  const [page, setPage] = useState(1)
  const limit = 10
  const skip = (page - 1) * limit

  const sortOptions = [
    { key: 'likes', order: 'desc', label: 'Most Liked', icon: <ThumbsUp className="mr-2 h-4 w-4" /> },
    { key: 'id', order: 'desc', label: 'Latest', icon: <Clock className="mr-2 h-4 w-4" /> },
  ]

  const [sortConfig, setSortConfig] = useState(sortOptions[0])

  const { data: commentsData, isLoading } = useQuery<CommentsResponse>({
    queryKey: ["comments", limit, skip, sortConfig],
    queryFn: () => fetchComments(limit, skip, sortConfig.key, sortConfig.order),
    staleTime: 5 * 60 * 1000,
  })

  const comments = useMemo(() => commentsData?.comments || [], [commentsData])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comment Moderation</h1>
          <p className="text-muted-foreground">
            Monitor community interactions prioritized by engagement or time.
          </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort By: {sortConfig.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.label} 
                  onClick={() => {
                    setSortConfig(option)
                    setPage(1)
                  }}
                  className="cursor-pointer"
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px] font-semibold py-4 px-6">Author</TableHead>
              <TableHead className="font-semibold py-4 px-6">Comment</TableHead>
              <TableHead className="font-semibold py-4 px-6 text-center">Post ID</TableHead>
              <TableHead className="font-semibold py-4 px-6 text-center">Likes</TableHead>
              <TableHead className="text-right font-semibold py-4 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment: Comment) => (
              <TableRow key={comment.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                        {comment.user.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-foreground">
                        {comment.user.fullName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">@{comment.user.username}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <p className="text-sm text-muted-foreground italic line-clamp-2 max-w-[400px]">
                    "{comment.body}"
                  </p>
                </TableCell>
                <TableCell className="py-4 px-6 text-center">
                  <Badge variant="outline" className="font-mono text-[10px] bg-background">
                    #{comment.postId}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6 text-center">
                   <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes}
                   </div>
                </TableCell>
                <TableCell className="text-right py-4 px-6">
                  <Button variant="outline" size="sm" asChild className="h-8 gap-1 hover:bg-primary/5">
                    <Link href={`/posts/${comment.postId}`}>
                      <span>👁️ View</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {isLoading && (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                        <div className="h-2 w-16 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6"><div className="h-4 w-full bg-muted animate-pulse rounded" /></TableCell>
                  <TableCell className="py-4 px-6"><div className="h-4 w-8 bg-muted animate-pulse rounded mx-auto" /></TableCell>
                  <TableCell className="py-4 px-6"><div className="h-4 w-8 bg-muted animate-pulse rounded mx-auto" /></TableCell>
                  <TableCell className="py-4 px-6"><div className="h-8 w-16 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-xs text-muted-foreground">
          Showing {skip + 1}-{Math.min(skip + limit, commentsData?.total || 0)} of {commentsData?.total || 0} comments
        </p>
        <div className="flex gap-2">
           <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
           >
             Previous
           </Button>
           <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={!commentsData || skip + limit >= commentsData.total}
           >
             Next
           </Button>
        </div>
      </div>
    </div>
  )
}
