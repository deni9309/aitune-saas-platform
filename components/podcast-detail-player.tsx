/* eslint-disable @typescript-eslint/no-unused-vars */
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
  return <div className="text-xl text-white-1">PodcastDetailPlayer</div>
}

export default PodcastDetailPlayer
