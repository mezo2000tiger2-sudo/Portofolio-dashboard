"use client"

import PostsPagination from '@/app/_components/posts/PostsPagination'
import PostTable from '@/app/_components/posts/PostTable'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PostsResponse } from '@/types/Post'

export default function PostsPage() {
  const [page, setPage] = useState(1)
  const limit = 10
  const skip = (page - 1) * limit

  const { data: postsData } = useQuery<PostsResponse>({
    queryKey: ['posts-count'],
    queryFn: () => fetch(`https://dummyjson.com/posts?limit=1`).then(r => r.json())
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Posts Management</h1>
        <p className="text-muted-foreground">
          View and manage all blog posts from your platform.
        </p>
      </div>
      
      <PostTable limit={limit} skip={skip} />
      
      <PostsPagination 
        currentPage={page} 
        total={postsData?.total || 0} 
        limit={limit} 
        onPageChange={(p) => setPage(p)} 
      />
    </div>
  )
}
