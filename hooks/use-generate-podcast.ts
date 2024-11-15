'use client'

import { useMutation } from 'convex/react'
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
  setIsFormDisabled,
  ..._props
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const uploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(uploadUrl)

  // const getPodcastAudio = useAction(api.openai.generateAudioAction)
  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const generatePodcast = async () => {
    setIsGenerating(true)
    setIsFormDisabled(true)
    setAudio('')

    if (!voicePrompt) {
      toast({ title: 'Please provide a prompt to generate audio' })
      setIsGenerating(false)
      setIsFormDisabled(false)
      return
    }

    try {
      // const response = await getPodcastAudio({ voice: voiceType, input: voicePrompt })
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/elevenlabs`, {
        method: 'POST',
        body: JSON.stringify({
          input: voicePrompt,
          voice: voiceType,
        }),
      })

      const blob = await response.blob() // const blob = new Blob([response], { type: 'audio/mpeg' })

      const fileName = `podcast-${uuidv4()}.mp3`
      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      const uploaded = await startUpload([file])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId: Id<'_storage'> = (uploaded[0].response as any).storageId

      setAudioStorageId(storageId)

      const audioUrl = await getAudioUrl({ storageId })
      setAudio(audioUrl!)

      toast({ title: 'Podcast generated successfully' })
    } catch (error) {
      console.error('Error generating podcast', error)
      toast({ title: 'Error generating podcast', variant: 'destructive' })
    } finally {
      setIsGenerating(false)
      setIsFormDisabled(false)
    }
  }

  return { isGenerating, generatePodcast }
}
