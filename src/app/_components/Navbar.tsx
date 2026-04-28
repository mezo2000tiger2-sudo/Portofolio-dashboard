"use client"

import React from 'react'
import Link from 'next/link'
import { LightAndDarkToggler } from './lightAndDarkToggler'
import MobileSidebar from './MobileSidebar'

export default function Navbar() {
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
      </div>
    </div>
  )
}
