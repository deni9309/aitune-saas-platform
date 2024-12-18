'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import EmptyState from '@/components/empty-state'
import Loader from '@/components/loader'
import PodcastDetailPlayer from '@/components/podcast-detail-player'
import PodcastCard from '@/components/podcast-card'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Podcast } from '@/types'

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
  const { user } = useUser()

  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const data = useQuery(api.podcasts.getPodcastById, { podcastId })

  const [similarPodcasts, setSimilarPodcasts] = useState<Podcast[] | null>(null)
  const similarData = useQuery(api.podcasts.getPodcastsByVoiceType, { podcastId })

  useEffect(() => {
    setPodcast(data as Podcast)

    setSimilarPodcasts(similarData ? (similarData as Podcast[]) : [])
  }, [data, podcastId, similarData])

  if (!podcast || !similarPodcasts) return <Loader isFullHeight showText={false} size={20} />

  const isOwner = user?.id === podcast.authorId

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex flex-wrap items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>

        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" width={24} height={24} alt="headphone" />
          <h2 className="text-16 font-bold text-white-1">{podcast.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer isOwner={isOwner} podcastId={podcast._id} podcast={podcast} />

      <p className="text-16 pb-8 pt-[45px] font-medium text-white-2 max-md:text-center">
        {podcast.podcastDescription}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">{podcast.voicePrompt}</p>
        </div>

        {podcast.imagePrompt && (
          <div className="flex flex-col gap-4">
            <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
            <p className="text-16 font-medium text-white-2">{podcast.imagePrompt}</p>
          </div>
        )}
      </div>

      <section className="mb-8 mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts.map((p) => (
              <PodcastCard
                key={p._id}
                imgUrl={p.imageUrl}
                title={p.podcastTitle}
                description={p.podcastDescription}
                podcastId={p._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Similar Podcasts Found."
            buttonLink="/discover"
            buttonText="Discover More Podcasts"
          />
        )}
      </section>
    </section>
  )
}

export default PodcastDetails
