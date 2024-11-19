'use client'

import { useEffect, useState } from 'react'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'convex/react'

import Header from '@/components/header'
import Carousel from '@/components/carousel'
import Loader from '@/components/loader'
import { api } from '@/convex/_generated/api'
import { TopPodcasters } from '@/types'
import { sliceEmail } from '@/lib/utils'

const RightSidebar = () => {
  const { user } = useUser()
  const [isFetching, setIsFetching] = useState(true)
  const [topPodcasters, setTopPodcasters] = useState<TopPodcasters[]>([])
  const data = useQuery(api.users.getTopUsersByPodcastCount)

  useEffect(() => {
    setIsFetching(true)
    if (data) {
      setTopPodcasters(data)
    } else {
      setTopPodcasters([])
    }
    setIsFetching(false)
  }, [data])

  return (
    <section className="right_sidebar text-white-1">
      <SignedIn>
        <Link
          href={`/profile/${user?.id}`}
          prefetch={true}
          className="mb-6 flex gap-2.5 rounded-xl px-1 py-3 transition duration-300 hover:bg-black-6"
        >
          <div className="ml-2">
            <UserButton />
          </div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : `${sliceEmail(user?.emailAddresses[0].emailAddress)}`}
            </h1>
            <Image src="/icons/right-arrow.svg" width={24} height={24} alt="Right Arrow" />
          </div>
        </Link>
      </SignedIn>

      <section>
        <Header headerTitle="Latest from Top Casters" />
        {isFetching ? (
          <Loader bounce={false} showText={false} size={5} />
        ) : (
          <Carousel slidesData={topPodcasters} options={{ loop: true }} />
        )}
      </section>
    </section>
  )
}

export default RightSidebar
