import React from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <div className='bg-primary dark:bg-slate-700 py-2 px-5 flex  justify-between text-white'>
      <Link href="/" className='text-2xl'>Dashboard</Link>
      <DropdownMenu>
  <DropdownMenuTrigger className='focus:outline-none'>
    <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback className='text-black'>CN</AvatarFallback>
      </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>
        <Link href="/profile">Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/auth">Logout</Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
      
    </div>
  )
}
