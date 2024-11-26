'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Progress } from '@/components/ui/progress'
import { cn, formatTime } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'
import { X } from 'lucide-react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const { audio, isPlayerVisible, setIsPlayerVisible } = useAudio()

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted((prev) => !prev)
    }
  }

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5
    }
  }

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
    }

    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateCurrentTime)

      return () => {
        audioElement.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [])

  useEffect(() => {
    const audioElement = audioRef.current
    if (audio?.audioUrl) {
      if (audioElement)
        audioElement.play().then(() => {
          setIsPlaying(true)
        })
    } else {
      audioElement?.pause()
      setIsPlaying(false)
    }
  }, [audio])

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleClose = () => {
    setIsPlaying(false)
    audioRef.current?.pause()
    if (audioRef.current?.currentTime) audioRef.current.currentTime -= audioRef.current.currentTime

    setIsPlayerVisible(false)
  }

  return (
    <div
      className={cn('sticky bottom-0 left-0 flex size-full flex-col duration-500 ease-in-out', {
        'animate-collapse collapse translate-y-[120px]': !isPlayerVisible,
        hidden: !audio?.audioUrl || audio?.audioUrl === '',
      })}
    >
      <Progress
        value={(currentTime / duration) * 100}
        max={duration === 0 ? 0.1 : duration}
        className="w-full"
      />

      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          src={audio?.audioUrl}
          ref={audioRef}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcast/${audio?.podcastId}`} prefetch={true}>
            <Image
              src={audio?.imageUrl || '/icons/podcast-placeholder.svg'}
              width={100}
              height={100}
              alt="player"
              priority
              className="h-auto w-[64px] rounded-xl object-cover"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">{audio?.title}</h2>
            <p className="text-12 text-white-2">{audio?.author}</p>
          </div>
        </div>

        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <Image src="/icons/reverse.svg" width={24} height={24} alt="rewind" onClick={rewind} />
            <p className="text-12 font-bold text-white-4">-5</p>
          </div>
          <Image
            src={isPlaying ? '/icons/Pause.svg' : '/icons/Play.svg'}
            alt={isPlaying ? 'pause' : 'play'}
            width={30}
            height={30}
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5">
            <p className="text-12 font-bold text-white-4">+5</p>
            <Image
              src="/icons/forward.svg"
              alt="forward"
              width={24}
              height={24}
              onClick={forward}
            />
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">{formatTime(duration)}</h2>

          <Image
            src={isMuted ? '/icons/unmute.svg' : '/icons/mute.svg'}
            alt={isMuted ? 'unmute' : 'mute'}
            width={24}
            height={24}
            onClick={toggleMute}
            className="cursor-pointer"
          />

          <X color="#fff" onClick={handleClose} className="h-6 w-6 cursor-pointer text-white-3" />
        </div>
      </section>
    </div>
  )
}

export default AudioPlayer
