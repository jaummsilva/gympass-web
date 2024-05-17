import '../styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { QueryClientProvider } from '@/providers/query-client-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: 'gympass | %s',
    default: 'gympass',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
