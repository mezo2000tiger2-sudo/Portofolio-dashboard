"use client"

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import Sidebar from './Sidebar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent side="left" className="p-0 w-72 h-full border-r border-border bg-sidebar overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>Navigation Menu</DialogTitle>
        </VisuallyHidden>
        <div onClick={() => setOpen(false)} className="h-full">
          <Sidebar />
        </div>
      </DialogContent>
    </Dialog>
  )
}
