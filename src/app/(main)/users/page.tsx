"use client"

import React, { useState, useMemo } from 'react'
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
import { MoreHorizontal, Mail, Phone, Briefcase, Calendar, User as UserIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'

const fetchUsers = async (): Promise<UsersResponse> => {
  const res = await fetch("https://dummyjson.com/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export default function UsersPage() {
  const { data: usersData, isLoading } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, 
  })

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const users = useMemo(() => usersData?.users || [], [usersData])

  const handleViewProfile = (user: User) => {
    setSelectedUser(user)
    setIsProfileOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            View team members and their detailed profile information.
          </p>
        </div>
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
                    {user.role || 'user'}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user.company?.name || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground">{user.company?.title || 'Member'}</span>
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
                      <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                        View Profile
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

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={selectedUser.image} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} />
                  <AvatarFallback className="text-xl">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.firstName} {selectedUser.lastName}</h3>
                  <p className="text-sm text-muted-foreground">@{selectedUser.username}</p>
                  <Badge className="mt-1 capitalize">{selectedUser.role || 'user'}</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="text-sm truncate">{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="text-sm">{selectedUser.phone || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> Company
                  </p>
                  <p className="text-sm font-medium">{selectedUser.company?.name || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground">{selectedUser.company?.title || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Birth Date
                  </p>
                  <p className="text-sm">{selectedUser.birthDate || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <UserIcon className="h-3 w-3" /> Personal
                  </p>
                  <p className="text-sm">{selectedUser.age || 'N/A'} years old, {selectedUser.gender || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button onClick={() => setIsProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
