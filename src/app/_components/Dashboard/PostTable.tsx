'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Post } from '@/types/Post'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
interface PostTableProps {
    limit?: number,
    title?: string
}

export default function PostTable({ limit, title }: PostTableProps) {
    const { data, isLoading , isError } = useQuery<Post[]>({
        queryKey: ['posts', { limit }],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())
    })
    const filitredPosts = limit ? data?.slice(0, limit) : data  
    return (
    <div className='mt-10'>
        <h3 className="text-3xl mb-4 font-semibold">
            {title || "Posts"}
        </h3>
        <Table>
            <TableCaption>A list of recent posts</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className='hidden md:table-cell'>User ID</TableHead>
                    <TableHead className='hidden md:table-cell text-right'>Post ID</TableHead>
                    <TableHead className='text-right'>View</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {filitredPosts?.map((post : Post) => {
                        return <>
                        <TableRow key={post.id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell className='hidden md:table-cell'>{post.userId}</TableCell>
                            <TableCell className='hidden md:table-cell text-right'> {post.id}</TableCell>
                            <TableCell className='hidden md:table-cell text-right'> 
                                <Link href={`/posts/${post.id}`}>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm text-xs'>
                                        View
                                    </button>
                                </Link>
                            </TableCell>
                        </TableRow>
                        </>
                    })}
            </TableBody>
        </Table>
    </div>
  )
}
