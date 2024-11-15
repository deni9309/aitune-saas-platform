'use client'

import Image from 'next/image'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import Loader from '@/components/loader'
import { useEffect, useState } from 'react'
import { Podcast } from '@/types'

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const data = useQuery(api.podcasts.getPodcastById, { podcastId })

  useEffect(() => {
    setPodcast(data as Podcast)
  }, [data])

  if (!podcast) return <Loader isFullHeight size={20} />

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>

        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" width={24} height={24} alt="headphone" />
          <h2 className="text-16 font-bold text-white-1"></h2>
        </figure>
      </header>
    </section>
  )
}

export default PodcastDetails
