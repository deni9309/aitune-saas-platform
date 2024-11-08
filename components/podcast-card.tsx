import Image from 'next/image'

const PodcastCard = ({
  imgUrl,
  title,
  description,
  podcastId,
}: {
  imgUrl: string
  title: string
  description: string
  podcastId: string
}) => {
  return (
    <div className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={320}
          height={213.5}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl object-cover 2xl:size-[200px]"
        />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <p className="text-12 truncate capitalize text-white-4">
            {description}
          </p>
        </div>
      </figure>
    </div>
  )
}

export default PodcastCard
