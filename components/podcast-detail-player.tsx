'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useAudio } from '@/providers/AudioProvider'
import { PodcastDetailPlayerProps } from '@/types'

const PodcastDetailPlayer = ({
  isOwner,
  podcastId,
  podcast: {
    audioUrl,
    podcastTitle,
    author,
    imageUrl,
    imageStorageId,
    audioStorageId,
    authorImageUrl,
    authorId,
  },
}: PodcastDetailPlayerProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { setAudio } = useAudio()

  const [isDeleting, setIsDeleting] = useState(false)

  const deletePodcast = useMutation(api.podcasts.deletePodcast)

  const handleDelete = async () => {
    if (!imageStorageId || !audioStorageId) {
      toast({ title: 'There was an error deleting the podcast', variant: 'destructive' })
      return
    }

    try {
      await deletePodcast({ podcastId, imageStorageId, audioStorageId })

      toast({ title: 'Podcast deleted successfully.' })
      router.push('/')
    } catch (error) {
      console.error(error)
      toast({ title: 'There was an error deleting the podcast', variant: 'destructive' })
    }
  }

  const handlePlay = () => {
    if (!audioUrl) {
      toast({ title: 'There was an error playing the podcast.' })
      return
    }

    setAudio({
      title: podcastTitle,
      audioUrl,
      imageUrl:  '/icons/no-podcast-img.svg',
      author,
      podcastId,
    })
  }

  if (!imageUrl || !authorImageUrl) return <Loader bounce={false} showText={false} size={10} />
  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast Cover"
          className="h-[250px] w-fit rounded-lg object-contain"
        />

        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`)
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Podcast Author"
                className="size-[30px] rounded-full object-cover"
              />
              <figcaption className="text-16 text-white-3">{author}</figcaption>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image src="/icons/Play.svg" width={20} height={20} alt="Play" /> &nbsp; Play Podcast
          </Button>
        </div>
      </div>

      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={20}
            alt="Three-dots icon"
            className="cursor-pointer"
            onClick={() => {
              setIsDeleting((prev) => !prev)
            }}
          />
          {isDeleting && (
            <div
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
              onClick={handleDelete}
            >
              <Image src="/icons/delete.svg" width={16} height={16} alt="Delete icon" />
              <p className="text-16 text-white-1">Delete</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PodcastDetailPlayer
