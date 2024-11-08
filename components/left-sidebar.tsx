'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

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
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`)

          return (
            <Link
              key={route}
              href={route}
              className={cn(
                'flex items-center justify-center gap-3 py-4 max-lg:px-4 lg:justify-start',
                isActive && 'border-r-4 border-orange-1 bg-nav-focus',
              )}
            >
              <Image src={imgUrl} width={24} height={24} alt={label} />
              <p>{label}</p>
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

export default LeftSidebar
