'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Post, PostsResponse } from '@/types/Post'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface PostTableProps {
    limit?: number,
    skip?: number,
    search?: string,
    sortBy?: string,
    order?: string,
    title?: string
}

export default function PostTable({ 
  limit = 10, 
  skip = 0, 
  search = "", 
  sortBy = "reactions", 
  order = "desc", 
  title 
}: PostTableProps) {
    const { data: postsData, isLoading, isError, error } = useQuery<PostsResponse>({
        queryKey: ['posts', { limit, skip, search, sortBy, order }],
        queryFn: async () => {
          const baseUrl = search 
            ? `https://dummyjson.com/posts/search?q=${search}&limit=100`
            : `https://dummyjson.com/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
          const res = await fetch(baseUrl)
          if (!res.ok) throw new Error("Failed to fetch posts")
          return res.json()
        }
    })
    
    // Deterministic date helper
    const getFormattedDate = (id: number) => {
      const date = new Date(2026, 3, 27)
      date.setDate(date.getDate() - (id % 30))
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const sortedPosts = useMemo(() => {
      let posts = postsData?.posts || []
      
      if (search || true) { 
        posts = [...posts].sort((a, b) => {
          let valA: any = a[sortBy as keyof Post]
          let valB: any = b[sortBy as keyof Post]

          if (sortBy === 'reactions') {
            valA = a.reactions?.likes || 0
            valB = b.reactions?.likes || 0
          }

          if (order === 'asc') {
            return valA > valB ? 1 : -1
          } else {
            return valA < valB ? 1 : -1
          }
        })
      }
      
      return search ? posts.slice(skip, skip + limit) : posts.slice(0, limit)
    }, [postsData, sortBy, order, search, skip, limit])

    if (isError) {
      return (
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
          <h3 className="text-lg font-bold text-destructive">Failed to load posts</h3>
          <p className="text-sm text-destructive/80 mt-1">{error?.message}</p>
        </div>
      )
    }

    return (
    <div className='bg-card border border-border rounded-xl overflow-hidden shadow-sm'>
        {title && (
            <div className="p-6 border-b border-border bg-muted/30">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
            </div>
        )}
        <Table>
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="font-semibold py-4 px-6">Title</TableHead>
                    <TableHead className='hidden lg:table-cell font-semibold py-4 px-6'>Category</TableHead>
                    <TableHead className='hidden sm:table-cell font-semibold py-4 px-6'>Released</TableHead>
                    <TableHead className='hidden md:table-cell font-semibold py-4 px-6'>Reactions</TableHead>
                    <TableHead className='text-right font-semibold py-4 px-6'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {sortedPosts.map((post: Post) => (
                        <TableRow key={post.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="py-4 px-6 font-medium max-w-[200px] md:max-w-[300px] truncate">{post.title}</TableCell>
                            <TableCell className='hidden lg:table-cell py-4 px-6'>
                                <div className="flex gap-1 flex-wrap">
                                    {post.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full capitalize font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className='hidden sm:table-cell py-4 px-6'>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{getFormattedDate(post.id)}</span>
                            </TableCell>
                            <TableCell className='hidden md:table-cell py-4 px-6 text-muted-foreground text-sm'>
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">👍 {post.reactions.likes}</span>
                            </TableCell>
                            <TableCell className='text-right py-4 px-6'> 
                                <Button variant="outline" size="sm" asChild className="h-8 gap-1 hover:bg-primary/5">
                                    <Link href={`/posts/${post.id}`}>
                                        <span>👁️ View</span>
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoading && Array.from({ length: limit }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="py-4 px-6"><div className="h-4 w-full bg-muted animate-pulse rounded" /></TableCell>
                            <TableCell className="hidden lg:table-cell py-4 px-6"><div className="h-4 w-16 bg-muted animate-pulse rounded" /></TableCell>
                            <TableCell className="hidden sm:table-cell py-4 px-6"><div className="h-4 w-20 bg-muted animate-pulse rounded" /></TableCell>
                            <TableCell className="hidden md:table-cell py-4 px-6"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                            <TableCell className="py-4 px-6"><div className="h-8 w-16 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                        </TableRow>
                    ))}
                    {!isLoading && sortedPosts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="py-10 text-center text-muted-foreground italic">
                          No posts found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
            </TableBody>
        </Table>
    </div>
  )
}