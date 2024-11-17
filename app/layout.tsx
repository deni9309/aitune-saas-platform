import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import './globals.css'
import { ConvexClerkProvider } from '@/providers/ConvexClerkProvider'
import { cn } from '@/lib/utils'
import AudioProvider from '@/providers/AudioProvider'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'AiTune | AI Podcast Platform',
  description: 'Generate your own podcasts using AI.',
  icons: '/icons/aitune-logo.svg',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={cn('font-manrope antialiased', manrope.variable)}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  )
}
