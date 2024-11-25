/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from 'react'
import { EmblaOptionsType } from 'embla-carousel'

import { Id } from '@/convex/_generated/dataModel'

export interface EmptyStateProps {
  title: string
  search?: boolean
  buttonText?: string
  buttonLink?: string
}

export interface PodcastProps {
  _id: Id<'podcasts'>
  _creationTime: number
  audioStorageId: Id<'_storage'> | null
  user: Id<'users'>
  podcastTitle: string
  podcastDescription: string
  audioUrl: string | null
  imageUrl: string | null
  imageStorageId: Id<'_storage'> | null
  author: string
  authorId: string
  authorImageUrl: string
  voicePrompt: string
  imagePrompt: string | null
  voiceType: string
  audioDuration: number
  views: number
}

export interface Podcast {
  _id: Id<'podcasts'>
  _creationTime: number
  audioStorageId?: Id<'_storage'> | undefined
  user: Id<'users'>
  podcastTitle: string
  podcastDescription: string
  audioUrl?: string | undefined
  imageUrl?: string | undefined
  imageStorageId?: Id<'_storage'> | undefined
  author: string
  authorId: string
  authorImageUrl: string
  voicePrompt: string
  imagePrompt?: string | undefined
  voiceType: string
  audioDuration: number
  views: number
}

export interface TopPodcasters {
  totalPodcasts: number
  podcasts: {
    podcastTitle: string
    podcastId: Id<'podcasts'>
    imageUrl?: string
  }[]
  _id: Id<'users'>
  _creationTime: number
  imageUrl: string
  email: string
  clerkId: string
  name: string
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[]
  listeners: number
}

export interface GeneratePodcastProps {
  voiceType: VoiceType
  setAudio: Dispatch<SetStateAction<string>>
  audio: string
  setAudioStorageId: Dispatch<SetStateAction<Id<'_storage'> | null>>
  voicePrompt: string
  setVoicePrompt: Dispatch<SetStateAction<string>>
  setAudioDuration: Dispatch<SetStateAction<number>>
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>
  isFormDisabled: boolean
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>
  setImageStorageId: Dispatch<SetStateAction<Id<'_storage'> | null>>
  image: string
  imagePrompt: string
  setImagePrompt: Dispatch<SetStateAction<string>>
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>
  isFormDisabled: boolean
}

export interface LatestPodcastCardProps {
  imgUrl: string
  title: string
  duration: string
  index: number
  audioUrl: string
  author: string
  views: number
  podcastId: Id<'podcasts'>
}

export interface PodcastDetailPlayerProps {
  isOwner: boolean
  podcastId: Id<'podcasts'>
  podcast: Podcast
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
  isPlayerVisible: boolean
  setIsPlayerVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PodcastCardProps {
  imgUrl?: string
  title: string
  description: string
  podcastId: Id<'podcasts'>
}

export interface CarouselProps {
  slidesData: TopPodcasters[]
  options?: EmblaOptionsType
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

// export type VoiceType = 'alloy' | 'shimmer' | 'nova' | 'echo' | 'fable' | 'onyx'
export type VoiceType = 'Alice' | 'Bill' | 'Brian' | 'George' | 'Jessica' | 'Laura'
