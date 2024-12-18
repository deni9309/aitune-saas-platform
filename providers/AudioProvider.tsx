'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { AudioContextType, AudioProps } from '@/types'

const AudioContext = createContext<AudioContextType | undefined>(undefined)

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [audio, setAudio] = useState<AudioProps | undefined>(undefined)
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(false)

  useEffect(() => {
    if (pathname === '/create-podcast') {
      setAudio(undefined)
      setIsPlayerVisible(false)
    }
  }, [pathname])

  return (
    <AudioContext.Provider value={{ audio, setAudio, isPlayerVisible, setIsPlayerVisible }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)

  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }

  return context
}

export default AudioProvider
