'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Post, PostsResponse } from '@/types/Post'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

interface PostTableProps {
    limit?: number,
    skip?: number,
    title?: string
}

export default function PostTable({ limit = 10, skip = 0, title }: PostTableProps) {
    const { data: postsData, isLoading } = useQuery<PostsResponse>({
        queryKey: ['posts', { limit, skip }],
        queryFn: () => fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`).then(r => r.json())
    })
    
    const posts = postsData?.posts || []

    return (
    <div className='bg-card border border-border rounded-xl overflow-hidden shadow-sm'>
        {title && (
            <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {title}
                </h3>
            </div>
        )}
        <Table>
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="font-semibold py-4 px-6">Title</TableHead>
                    <TableHead className='hidden lg:table-cell font-semibold py-4 px-6'>Category</TableHead>
                    <TableHead className='hidden md:table-cell font-semibold py-4 px-6'>Reactions</TableHead>
                    <TableHead className='hidden md:table-cell text-right font-semibold py-4 px-6'>Views</TableHead>
                    <TableHead className='text-right font-semibold py-4 px-6'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {posts.map((post: Post) => (
                        <TableRow key={post.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="py-4 px-6 font-medium max-w-[300px] truncate">{post.title}</TableCell>
                            <TableCell className='hidden lg:table-cell py-4 px-6'>
                                <div className="flex gap-1 flex-wrap">
                                    {post.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full capitalize font-medium whitespace-nowrap">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className='hidden md:table-cell py-4 px-6 text-muted-foreground text-sm'>
                                <span className="text-emerald-600 dark:text-emerald-400">👍 {post.reactions.likes}</span>
                                <span className="mx-2">·</span>
                                <span className="text-rose-600 dark:text-rose-400">👎 {post.reactions.dislikes}</span>
                            </TableCell>
                            <TableCell className='hidden md:table-cell text-right py-4 px-6 font-mono text-xs text-muted-foreground'>{post.views.toLocaleString()}</TableCell>
                            <TableCell className='text-right py-4 px-6'> 
                                <Button variant="outline" size="sm" asChild className="h-8 gap-1">
                                    <Link href={`/posts/${post.id}`}>
                                        <Eye className="h-3.5 w-3.5" />
                                        <span>View</span>
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoading && (
                        Array.from({ length: limit }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="py-4 px-6"><div className="h-4 w-full bg-muted animate-pulse rounded" /></TableCell>
                                <TableCell className="hidden lg:table-cell py-4 px-6"><div className="h-4 w-16 bg-muted animate-pulse rounded" /></TableCell>
                                <TableCell className="hidden md:table-cell py-4 px-6"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                                <TableCell className="hidden md:table-cell py-4 px-6"><div className="h-4 w-8 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                                <TableCell className="py-4 px-6"><div className="h-8 w-16 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                            </TableRow>
                        ))
                    )}
            </TableBody>
        </Table>
    </div>
  )
}