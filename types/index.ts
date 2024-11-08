/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from 'react'

import { IdField } from 'convex/server'

export interface EmptyStateProps {
  title: string
  search?: boolean
  buttonText?: string
  buttonLink?: string
}

export interface TopPodcastersProps {
  _id: IdField<'users'>
  _creationTime: number
  email: string
  imageUrl: string
  clerkId: string
  name: string
  podcast: {
    podcastTitle: string
    podcastId: IdField<'podcasts'>
  }[]
  totalPodcasts: number
}

export interface PodcastProps {
  _id: IdField<'podcasts'>
  _creationTime: number
  audioStorageId: IdField<'_storage'> | null
  user: IdField<'users'>
  podcastTitle: string
  podcastDescription: string
  audioUrl: string | null
  imageUrl: string | null
  imageStorageId: IdField<'_storage'> | null
  author: string
  authorId: string
  authorImageUrl: string
  voicePrompt: string
  imagePrompt: string | null
  voiceType: string
  audioDuration: number
  views: number
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[]
  listeners: number
}

export interface GeneratePodcastProps {
  voiceType: string
  setAudio: Dispatch<SetStateAction<string>>
  audio: string
  setAudioStorageId: Dispatch<SetStateAction<IdField<'_storage'> | null>>
  voicePrompt: string
  setVoicePrompt: Dispatch<SetStateAction<string>>
  setAudioDuration: Dispatch<SetStateAction<number>>
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>
  setImageStorageId: Dispatch<SetStateAction<IdField<'_storage'> | null>>
  image: string
  imagePrompt: string
  setImagePrompt: Dispatch<SetStateAction<string>>
}

export interface LatestPodcastCardProps {
  imgUrl: string
  title: string
  duration: string
  index: number
  audioUrl: string
  author: string
  views: number
  podcastId: IdField<'podcasts'>
}

export interface PodcastDetailPlayerProps {
  audioUrl: string
  podcastTitle: string
  author: string
  isOwner: boolean
  imageUrl: string
  podcastId: IdField<'podcasts'>
  imageStorageId: IdField<'_storage'>
  audioStorageId: IdField<'_storage'>
  authorImageUrl: string
  authorId: string
}

export interface AudioProps {
  title: string
  audioUrl: string
  author: string
  imageUrl: string
  podcastId: string
}

export interface AudioContextType {
  audio: AudioProps | undefined
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>
}

export interface PodcastCardProps {
  imgUrl: string
  title: string
  description: string
  podcastId: IdField<'podcasts'>
}

export interface CarouselProps {
  fansLikeDetail: TopPodcastersProps[]
}

export interface ProfileCardProps {
  podcastData: ProfilePodcastProps
  imageUrl: string
  userFirstName: string
}

export type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}
