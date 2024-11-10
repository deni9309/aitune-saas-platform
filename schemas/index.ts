import * as z from 'zod'

export const PodcastFormSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})
