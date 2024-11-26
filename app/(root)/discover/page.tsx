'use client'

import { useQuery } from 'convex/react'

import Loader from '@/components/loader'
import { api } from '@/convex/_generated/api'
import { Podcast } from '@/types'
import EmptyState from '@/components/empty-state'
import PodcastCard from '@/components/podcast-card'
import Searchbar from '@/components/searchbar'

const Discover = ({ searchParams: { search } }: { searchParams: { search: string } }) => {
  const data: Podcast[] | undefined = useQuery(api.podcasts.getPodcastsBySearch, {
    search: search || '',
  })

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? 'Discover Vast Variety of Podcasts' : 'Search Results for: '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {data ? (
          <>
            {data.length > 0 ? (
              <div className="podcast_grid">
                {data.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imageUrl}
                    title={podcast.podcastTitle}
                    description={podcast.podcastDescription}
                    podcastId={podcast._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No Podcasts Found" />
            )}
          </>
        ) : (
          <div className="flex-center h-[50vh] w-full">
            <Loader size={10} bounce={false} showText={false} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover
