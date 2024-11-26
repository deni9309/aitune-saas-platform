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
import { cn } from '@/lib/utils'

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
  const { setAudio, setIsPlayerVisible } = useAudio()

  const [isDeleting, setIsDeleting] = useState(false)

  const deletePodcast = useMutation(api.podcasts.deletePodcast)

  const handleDelete = async () => {
    if (!imageStorageId || !audioStorageId) {
      toast({ title: 'There was an error deleting the podcast', variant: 'destructive' })
      return router.push('/')
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
      imageUrl: imageUrl || '/icons/podcast-placeholder.svg',
      author,
      podcastId,
    })

    setIsPlayerVisible(true)
  }

  if (!imageUrl || !authorImageUrl) return <Loader bounce={false} showText={false} size={10} />

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          priority
          width={250}
          height={250}
          alt="Podcast Cover"
          className="aspect-square max-w-[250px] rounded-lg object-cover"
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
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1 transition duration-300 hover:bg-black-6"
          >
            <Image src="/icons/Play.svg" width={20} height={20} alt="Play" /> &nbsp; Play Podcast
          </Button>
        </div>
      </div>

      {isOwner && (
        <div className="relative max-lg:ml-2">
          <Image
            src="/icons/three-dots.svg"
            width={26}
            height={26}
            alt="Three-dots icon"
            className={cn(
              'relative z-10 h-[36px] cursor-pointer rounded-r-md bg-black-6',
              !isDeleting && 'rounded-md',
            )}
            onClick={() => {
              setIsDeleting((prev) => !prev)
            }}
          />

          <div
            className={cn(
              'flex-center absolute top-0 z-10 h-[36px] w-32 cursor-pointer gap-2 rounded-l-md bg-black-6 duration-500 ease-in-out hover:bg-black-5',
              isDeleting
                ? 'right-[26.2px] opacity-100'
                : 'collapse right-[2px] z-0 overflow-hidden opacity-0',
            )}
            onClick={handleDelete}
          >
            <Image src="/icons/delete.svg" width={18} height={18} alt="Delete icon" />
            <p className="text-16 text-white-1">Delete</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PodcastDetailPlayer
