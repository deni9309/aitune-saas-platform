import Image from 'next/image'

import LeftSidebar from '@/components/left-sidebar'
import RightSidebar from '@/components/right-sidebar'
import MobileNav from '@/components/mobile-nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                src="/icons/menu.svg"
                width={36}
                height={36}
                alt="menu"
                priority
                className="cursor-pointer rounded-lg bg-zinc-800 p-1 transition hover:invert"
              />
              <MobileNav />
            </div>

            <div className="flex flex-col md:pb-14">
              Toaster
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </div>
  )
}
