'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Post } from '@/types/Post'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

interface PostTableProps {
    limit?: number,
    title?: string
}

export default function PostTable({ limit, title }: PostTableProps) {
    const { data, isLoading } = useQuery<Post[]>({
        queryKey: ['posts', { limit }],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())
    })
    
    const filteredPosts = limit ? data?.slice(0, limit) : data  

    return (
    <div className='mt-10 bg-card border border-border rounded-xl overflow-hidden shadow-sm'>
        <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
                {title || "Recent Posts"}
            </h3>
            {limit && (
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/posts">View All</Link>
                </Button>
            )}
        </div>
        <Table>
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="font-semibold py-4 px-6">Title</TableHead>
                    <TableHead className='hidden md:table-cell font-semibold py-4 px-6'>Author ID</TableHead>
                    <TableHead className='hidden md:table-cell text-right font-semibold py-4 px-6'>ID</TableHead>
                    <TableHead className='text-right font-semibold py-4 px-6'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {filteredPosts?.map((post: Post) => (
                        <TableRow key={post.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="py-4 px-6 font-medium max-w-[300px] truncate">{post.title}</TableCell>
                            <TableCell className='hidden md:table-cell py-4 px-6 text-muted-foreground'>User #{post.userId}</TableCell>
                            <TableCell className='hidden md:table-cell text-right py-4 px-6 font-mono text-xs text-muted-foreground'>#{post.id}</TableCell>
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
                        Array.from({ length: limit || 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="py-4 px-6"><div className="h-4 w-full bg-muted animate-pulse rounded" /></TableCell>
                                <TableCell className="hidden md:table-cell py-4 px-6"><div className="h-4 w-12 bg-muted animate-pulse rounded" /></TableCell>
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