'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import GenerateThumbnail from '@/components/generate-thumbnail'
import GeneratePodcast from '@/components/generate-podcast'
import { Id } from '@/convex/_generated/dataModel'
import { voiceCategories } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { PodcastFormSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import { VoiceType } from '@/types'

const CreatePodcast = () => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(null)
  const [imagePrompt, setImagePrompt] = useState('')

  const [audioUrl, setAudioUrl] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)

  const [voiceType, setVoiceType] = useState<VoiceType | null>(null)
  const [voicePrompt, setVoicePrompt] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof PodcastFormSchema>>({
    resolver: zodResolver(PodcastFormSchema),
    defaultValues: {
      podcastTitle: '',
      podcastDescription: '',
    },
  })

  async function onSubmit(data: z.infer<typeof PodcastFormSchema>) {
    try {
      setIsSubmitting(true)

      if (!audioUrl || !imageUrl || !voiceType) {
        toast({ title: 'Please, generate audio and image first.' })
        setIsSubmitting(false)
        throw new Error('Please, generate audio and image first.')
      }

      //const podcast =await api.createPodcast({
      //  podcastTitle: data.podcastTitle,
      //  podcastDescription: data.podcastDescription,
      //  imageUrl,
      //  audioUrl,
      //  audioDuration,
      //  voiceType,
      //  voicePrompt,
      //  imagePrompt,
      //  views: 0,
      //  audioStorageId: audioStorageId!,
      //  imageStorageId: imageStorageId!,
      //})

      toast({ title: 'Podcast created successfully!' })
      setIsSubmitting(false)

      router.push(`/`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong.',
        description: 'Your podcast was not created. Please try again.',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col *:placeholder:text-gray-1"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Artificial Symphony"
                      className="input-class focus-visible:ring-offset-orange-1"
                      disabled={isFormDisabled || isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-white-1" />
                </FormItem>
              )}
            />

            <div className="*:text-16 flex flex-col gap-2.5">
              <Label htmlFor="voiceType" className="font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select
                name="voiceType"
                onValueChange={(value) => setVoiceType(value as VoiceType)}
                disabled={isFormDisabled || isSubmitting}
              >
                <SelectTrigger
                  id="voiceType"
                  className="w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1"
                >
                  <SelectValue placeholder="Select AI Voice" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="transition-colors focus:bg-orange-1"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a short description for your podcast"
                      className="input-class focus-visible:ring-offset-orange-1"
                      disabled={isFormDisabled || isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType as VoiceType}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
              setIsFormDisabled={setIsFormDisabled}
              isFormDisabled={isFormDisabled}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
              setIsFormDisabled={setIsFormDisabled}
              isFormDisabled={isFormDisabled}
            />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="primary-btn"
                disabled={isSubmitting || isFormDisabled}
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="ml-2 animate-spin" />
                  </>
                ) : (
                  'Submit & Publish Podcast'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast
