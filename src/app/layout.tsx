import { ReactNode } from 'react'
import { Geist } from 'next/font/google'

import BetSlip from '@/features/BetSlip'
import ResponsibleGamblingBanner from '@/features/ResponsibleGamblingBanner'
import StickyHeader from '@/components/core/StickyHeader'
import Header from '@/components/core/Header'

import { Toaster } from '@/components/ui/sonner'

import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

import { getAppConfig } from '@/lib/api/config'

import type { Metadata } from 'next'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sportsbook',
  description: 'Live sports betting platform',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { betSlipConfig, responsibleGambling } = await getAppConfig()

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <StickyHeader>
              <ResponsibleGamblingBanner config={responsibleGambling} />
              <Header />
            </StickyHeader>
            <div className="flex flex-1">
              <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">{children}</div>
              <BetSlip config={betSlipConfig} />
            </div>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
