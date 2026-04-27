"use client"

import PostsPagination from '@/app/_components/posts/PostsPagination'
import PostTable from '@/app/_components/posts/PostTable'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PostsResponse } from '@/types/Post'
import { Input } from '@/components/ui/input'
import { Search, ArrowUpDown, TrendingUp, ThumbsUp, Type, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PostsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  
  const sortOptions = [
    { key: 'reactions', order: 'desc', label: 'Most Liked', icon: <ThumbsUp className="mr-2 h-4 w-4" /> },
    { key: 'id', order: 'desc', label: 'Latest', icon: <Clock className="mr-2 h-4 w-4" /> },
    { key: 'title', order: 'asc', label: 'Alphabetical', icon: <Type className="mr-2 h-4 w-4" /> },
  ]

  const [sortConfig, setSortConfig] = useState(sortOptions[0])
  
  const limit = 10
  const skip = (page - 1) * limit

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // Reset to first page on search
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const { data: postsData } = useQuery<PostsResponse>({
    queryKey: ['posts-count', debouncedSearch],
    queryFn: () => {
      const url = debouncedSearch 
        ? `https://dummyjson.com/posts/search?q=${debouncedSearch}&limit=1`
        : `https://dummyjson.com/posts?limit=1`
      return fetch(url).then(r => r.json())
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts Management</h1>
          <p className="text-muted-foreground">
            View and manage all blog posts from your platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
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
                    setPage(1) // Reset to first page on sort change
                  }}
                  className="cursor-pointer"
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
           <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search posts..." 
              className="pl-9 h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <PostTable 
        limit={limit} 
        skip={skip} 
        search={debouncedSearch} 
        sortBy={sortConfig.key} 
        order={sortConfig.order} 
      />
      
      <PostsPagination 
        currentPage={page} 
        total={postsData?.total || 0} 
        limit={limit} 
        onPageChange={(p) => setPage(p)} 
      />
    </div>
  )
}
