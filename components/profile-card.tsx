'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useAudio } from '@/providers/AudioProvider'
import { Podcast, ProfileCardProps } from '@/types'
import { Button } from '@/components/ui/button'
import Loader from '@/components/loader'

const ProfileCard = ({ podcastData, imageUrl, userFirstName }: ProfileCardProps) => {
  const { setAudio, setIsPlayerVisible } = useAudio()
  const [randomPodcast, setRandomPodcast] = useState<Podcast | null>(null)

  const playRandomPodcast = () => {
    const random = Math.floor(Math.random() * podcastData.podcasts?.length || 1)
    setRandomPodcast(podcastData.podcasts[random])
  }

  useEffect(() => {
    if (randomPodcast && randomPodcast.audioUrl) {
      setAudio({
        title: randomPodcast.podcastTitle,
        audioUrl: randomPodcast.audioUrl,
        imageUrl: randomPodcast.imageUrl || '/icons/podcast-placeholder.svg',
        author: randomPodcast.author,
        podcastId: randomPodcast._id,
      })
      setIsPlayerVisible(true)
    }
  }, [randomPodcast, setAudio, setIsPlayerVisible])

  if (!imageUrl) return <Loader bounce={false} showText={false} size={4} />

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />

      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image src="/icons/verified.svg" width={15} height={15} alt="Verified" />
            <h2 className="text-14 font-medium text-white-2">Verified Creator</h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image src="/icons/headphone.svg" width={24} height={24} alt="Headphones" />
          <h2 className="text-16 font-semibold text-white-1">
            {podcastData?.listeners ? (
              <>
                {podcastData.listeners} &nbsp;
                <span className="font-normal text-white-2">
                  {podcastData.listeners === 1 ? 'listener' : 'listeners'}
                </span>
              </>
            ) : (
              '0 listeners'
            )}
          </h2>
        </figure>
        {podcastData?.podcasts?.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1 transition duration-300 hover:bg-black-6"
          >
            <Image src="/icons/Play.svg" width={20} height={20} alt="Random play" /> &nbsp; Play a
            random podcast
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
