'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import PodcastCard from '@/components/podcast-card'
import Loader from '@/components/loader'

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts)

  if (!trendingPodcasts) return <Loader isFullHeight size={20} />

  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl}
              title={podcast.podcastTitle}
              description={podcast.podcastDescription}
              podcastId={podcast._id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
