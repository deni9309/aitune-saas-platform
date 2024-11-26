'use client'

import Image from 'next/image'
import Link from 'next/link'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { usePathname } from 'next/navigation'

import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'
import { useAudio } from '@/providers/AudioProvider'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'

const MobileNav = () => {
  const { isPlayerVisible } = useAudio()
  const pathname = usePathname()

  return (
    <section className="md:hidden">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Image
            src="/icons/menu.svg"
            width={36}
            height={36}
            alt="Menu"
            priority
            className="h-auto w-[36px] cursor-pointer rounded-lg bg-zinc-800 p-1 transition hover:invert"
          />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="w-[260px] border-none bg-black-1 pr-0 md:hidden"
          aria-description="Mobile Navigation"
        >
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Mobile Navigation</SheetDescription>
            </VisuallyHidden>
            <Link href="/" prefetch={true} className="w-fit">
              <Image
                src="/icons/aitune-logo.svg"
                width={872}
                height={582}
                priority
                alt="AiTune Logo"
                className="mb-6 h-auto max-w-[120px] scale-[0.7]"
              />
            </Link>
          </SheetHeader>
          <div className={cn('flex', isPlayerVisible ? 'h-[calc(100vh-130px]' : 'h-screen')}>
            <nav className="flex w-full flex-col gap-y-3 text-white-1">
              {sidebarLinks.map(({ imgUrl, route, label }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`)

                return (
                  <SheetClose asChild key={route}>
                    <Link
                      href={route}
                      className={cn(
                        'flex items-center justify-start gap-2.5 rounded-l-xl py-4 transition duration-300 hover:translate-x-1 hover:bg-black-6 max-lg:px-4',
                        isActive && 'border-r-4 border-orange-1 bg-nav-focus',
                      )}
                    >
                      <Image src={imgUrl} width={24} height={24} alt={label} className="ml-2" />
                      <p>{label}</p>
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
