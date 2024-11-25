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
import { cn, sliceEmail } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'

const RightSidebar = () => {
  const { user, isSignedIn } = useUser()
  const { isPlayerVisible } = useAudio()
  const [isFetching, setIsFetching] = useState(true)
  const [topPodcasters, setTopPodcasters] = useState<TopPodcasters[]>([])
  const data = useQuery(api.users.getTopUsersByPodcastCount)

  useEffect(() => {
    setIsFetching(true)
    if (data) setTopPodcasters(data)
    else setTopPodcasters([])

    setIsFetching(false)
  }, [data])

  return (
    <section
      className={cn(
        'right_sidebar overflow-y-auto text-white-1',
        isPlayerVisible ? 'h-[calc(100vh-130px)]' : 'min-h-screen',
      )}
    >
      {isSignedIn && user && (
        <SignedIn>
          <Link
            href={`/profile/${user.id}`}
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
                  : `${sliceEmail(user.emailAddresses[0].emailAddress)}`}
              </h1>
              <Image src="/icons/right-arrow.svg" width={24} height={24} alt="Right Arrow" />
            </div>
          </Link>
        </SignedIn>
      )}

      <section>
        <Header headerTitle="Top & Latest" />
        {isFetching ? (
          <Loader bounce={false} showText={false} size={5} />
        ) : (
          <Carousel slidesData={topPodcasters} options={{ loop: true }} />
        )}
      </section>
      <section className="mt-12 flex flex-col gap-8">
        <Header headerTitle="Top Podcasters" />
        <div className="flex flex-col">
          {topPodcasters.length > 0 &&
            topPodcasters.slice(0, 4).map((p) => (
              <div
                key={p._id}
                className="relative after:absolute after:mx-[calc(50%-110px)] after:w-[220px] after:border-b after:border-b-black-5 after:content-['']"
              >
                <Link
                  href={`/profile/${p.clerkId}`}
                  prefetch={true}
                  className="my-1.5 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition duration-200 hover:bg-black-6"
                >
                  <figure className="flex items-center gap-2">
                    <Image
                      src={p.imageUrl}
                      width={36}
                      height={36}
                      alt={p.name}
                      className="aspect-square rounded-lg"
                    />
                    <p className="text-14 font-semibold">{p.name}</p>
                  </figure>
                  <div className="flex items-center">
                    <p className="text-12">
                      {p.totalPodcasts} {p.totalPodcasts === 1 ? 'podcast' : 'podcasts'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </section>
  )
}

export default RightSidebar
