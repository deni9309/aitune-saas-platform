'use client'

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Loader from '@/components/loader'
import ProfileCard from '@/components/profile-card'
import PodcastCard from '@/components/podcast-card'
import EmptyState from '@/components/empty-state'

const Profile = ({ params }: { params: { profileId: string } }) => {
  const user = useQuery(api.users.getUserById, { clerkId: params.profileId })

  const castsData = useQuery(api.podcasts.getPodcastsByAuthor, { authorId: params.profileId })

  if (!user) return <Loader isFullHeight={true} size={20} />

  return (
    <section className="mt-9 flex flex-col">
      <div className="rounded-xl bg-gradient-to-t from-black-3 to-black-6 p-6">
        <h1 className="text-20 font-bold text-white-1 max-md:text-center">AiTune Profile</h1>
        <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
          {castsData ? (
            <ProfileCard
              podcastData={castsData}
              imageUrl={user?.imageUrl}
              userFirstName={user?.name}
            />
          ) : (
            <Loader bounce={false} size={4} />
          )}
        </div>
      </div>

      <section className="mt-9 flex flex-col gap-5 max-md:mb-9">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {castsData && castsData.podcasts.length == 0 ? (
          <div className="podcast_grid">
            {castsData.podcasts.map((podcast) => (
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
          <EmptyState
            title="You have not created any podcasts"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  )
}

export default Profile
