import Image from 'next/image'

import LeftSidebar from '@/components/left-sidebar'
import RightSidebar from '@/components/right-sidebar'
import MobileNav from '@/components/mobile-nav'
import { Toaster } from '@/components/ui/toaster'
import AudioPlayer from '@/components/audio-player'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />

        <section className="flex min-h-screen max-w-5xl flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full flex-col max-sm:px-4">
            <div className="flex h-[82px] items-center justify-between md:!hidden">
              <Link href="/" prefetch={true}>
                <Image
                  src="/icons/aitune-logo.svg"
                  width={872}
                  height={582}
                  priority
                  alt="AiTune Logo"
                  className="h-[36px] w-auto"
                />
              </Link>
              <MobileNav />
            </div>

            <div className="flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>

        <RightSidebar />
      </main>

      <AudioPlayer />
    </div>
  )
}
