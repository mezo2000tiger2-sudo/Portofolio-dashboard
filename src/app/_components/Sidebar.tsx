import React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link'
import { LayoutDashboard, Newspaper, User, Settings, MessageSquare } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className='h-full bg-sidebar'>
      <Command className="bg-transparent rounded-none h-full border-none">
        <div className="p-3">
          <CommandInput placeholder="Search navigation..." className="h-9 border-none focus-visible:ring-0 bg-background/50 rounded-md" />
        </div>
        <CommandList className="max-h-none overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Main" className="px-2">
            <CommandItem className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md group">
              <LayoutDashboard className='h-4 w-4 text-muted-foreground group-aria-selected:text-foreground' />
              <Link href="/" className="flex-1 font-medium">Dashboard</Link>
            </CommandItem>
            <CommandItem className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md group">
              <Newspaper className='h-4 w-4 text-muted-foreground group-aria-selected:text-foreground' />
              <Link href="/posts" className="flex-1 font-medium">Posts</Link>
            </CommandItem>
            <CommandItem className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md group">
              <User className='h-4 w-4 text-muted-foreground group-aria-selected:text-foreground' />
              <Link href="/users" className="flex-1 font-medium">Users</Link>
            </CommandItem>
            <CommandItem className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md group">
              <MessageSquare className='h-4 w-4 text-muted-foreground group-aria-selected:text-foreground' />
              <Link href="/comments" className="flex-1 font-medium">Comments</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
