'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Routes } from './routes'

export function SideMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-2xl">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col items-start gap-4">
          <Routes setIsSheetOpen={setIsSheetOpen} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
