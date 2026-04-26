import PostsPagination from '@/app/_components/posts/PostsPagination'
import PostTable from '@/app/_components/posts/PostTable'
import React from 'react'

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Posts Management</h1>
        <p className="text-muted-foreground">
          View and manage all blog posts from your platform.
        </p>
      </div>
      <PostTable />
    </div>
  )
}
