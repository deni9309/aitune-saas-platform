'use client'

import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { LogOut, LogIn } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link href="/" prefetch className="cursor-pointer pb-10 text-center">
          <Image
            src="/icons/aitune-logo.svg"
            width={145.3}
            height={96.83}
            priority
            alt="AiTune Logo"
            className="max-lg:scale-[0.7] lg:scale-90"
          />
        </Link>

        {sidebarLinks.map(({ imgUrl, route, label }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`)

          return (
            <Link
              key={route}
              href={route}
              className={cn(
                'flex items-center justify-center gap-2.5 rounded-l-xl py-4 transition duration-300 hover:translate-x-1 hover:bg-black-6 max-lg:px-4 lg:justify-start',
                isActive && 'border-r-4 border-orange-1 bg-nav-focus',
              )}
            >
              <Image src={imgUrl} width={24} height={24} alt={label} className="ml-2" />
              <p>{label}</p>
            </Link>
          )
        })}
      </nav>

      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="secondary-btn w-full">
            <LogIn />
            <Link href="/sign-in" prefetch={true}>
              Sign In
            </Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            variant={'outline'}
            onClick={() => signOut(() => router.push('/sign-in'))}
            className="secondary-btn w-full"
          >
            <LogOut />
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  )
}

export default LeftSidebar
