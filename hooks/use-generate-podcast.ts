'use client'

import { useAction, useMutation } from 'convex/react'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useUploadFiles } from '@xixixao/uploadstuff/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useToast } from '@/hooks/use-toast'
import { GeneratePodcastProps } from '@/types'

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
  ..._props
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const uploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(uploadUrl)

  const getPodcastAudio = useAction(api.openai.generateAudioAction)
  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const generatePodcast = async () => {
    setIsGenerating(true)
    setAudio('')

    if (!voicePrompt) {
      toast({ title: 'Please provide a prompt to generate audio' })
      return setIsGenerating(false)
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      })

      const blob = new Blob([response], { type: 'audio/mpeg' })
      const fileName = `podcast-${uuidv4()}.mp3`
      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      const uploaded = await startUpload([file])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId: Id<'_storage'> = (uploaded[0].response as any).storageId

      setAudioStorageId(storageId)

      const audioUrl = await getAudioUrl({ storageId })
      setAudio(audioUrl!)

      setIsGenerating(false)
      toast({ title: 'Podcast generated successfully' })
    } catch (error) {
      console.error('Error generating podcast', error)
      setIsGenerating(false)
      toast({
        title: 'Error generating podcast',
        variant: 'destructive',
      })
    }
  }

  return { isGenerating, generatePodcast }
}
