"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, UsersResponse } from '@/types/User'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Mail, Phone, Briefcase } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const fetchUsers = () =>
  fetch("https://dummyjson.com/users").then(r => r.json())

export default function UsersPage() {
  const { data: usersData, isLoading } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const users = usersData?.users || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their account permissions.
          </p>
        </div>
        <Button>Add User</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px] font-semibold py-4 px-6">User</TableHead>
              <TableHead className="font-semibold py-4 px-6">Contact</TableHead>
              <TableHead className="font-semibold py-4 px-6">Role</TableHead>
              <TableHead className="font-semibold py-4 px-6">Company</TableHead>
              <TableHead className="text-right font-semibold py-4 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">@{user.username}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <Badge 
                    variant={user.role === 'admin' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'}
                    className="capitalize text-[10px]"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user.company.name}</span>
                    <span className="text-xs text-muted-foreground">{user.company.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Deactivate User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {isLoading && (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                        <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6"><div className="h-5 w-16 bg-muted animate-pulse rounded" /></TableCell>
                  <TableCell className="py-4 px-6"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                  <TableCell className="py-4 px-6"><div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
