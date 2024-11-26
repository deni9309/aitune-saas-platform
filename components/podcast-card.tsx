'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { PodcastCardProps } from '@/types'

const PodcastCard = ({ imgUrl, title, description, podcastId }: PodcastCardProps) => {
  const router = useRouter()

  const handleViews = () => {
    router.push(`/podcasts/${podcastId}`, { scroll: true })
  }

  return (
    <div
      onClick={handleViews}
      className="flex w-full flex-1 cursor-pointer flex-col p-0 transition duration-300 hover:scale-[.97] max-lg:p-2 max-sm:px-10"
    >
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl || '/icons/podcast-placeholder.svg'}
          width={320}
          height={213.5}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl object-cover 2xl:size-[200px]"
          priority
        />
        <div className="flex w-full flex-col gap-0.5">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <p className="text-12 truncate capitalize text-white-4">{description}</p>
        </div>
      </figure>
    </div>
  )
}

export default PodcastCard
