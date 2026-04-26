"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LightAndDarkToggler } from './lightAndDarkToggler'
import MobileSidebar from './MobileSidebar'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    // Clear cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null)
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border py-3 px-6 flex justify-between items-center'>
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <Link href="/" className='text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity'>
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LightAndDarkToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full'>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
                alt={user?.username || "@user"}
              />
              <AvatarFallback className='bg-muted text-muted-foreground text-xs'>
                {user?.firstName?.[0]}{user?.lastName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "Connect to access features"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer w-full">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
