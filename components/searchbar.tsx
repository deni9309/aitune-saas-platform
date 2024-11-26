'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

const Searchbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/discover?search=${debouncedSearch}`)
    } else if (!debouncedSearch && pathname === '/discover') {
      router.push('/discover')
    }
  }, [router, pathname, debouncedSearch])

  return (
    <div className="relative mt-8 block">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
        placeholder="Search for podcasts"
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
      />
      <Image
        src="/icons/search.svg"
        width={20}
        height={20}
        alt="Search"
        className="absolute left-4 top-3.5"
      />
    </div>
  )
}

export default Searchbar
