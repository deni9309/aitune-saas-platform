'use client'

import { GeneratePodcastProps } from '@/types'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Loader from '@/components/loader'
import { useGeneratePodcast } from '@/hooks/use-generate-podcast'

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props)

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="voicePrompt" className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          id="voicePrompt"
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
          rows={5}
          placeholder="Provide text to generate audio..."
          className="input-class focus-visible:ring-offset-orange-1"
        />
      </div>

      <div className="mt-5 max-w-[200px]">
        <Button
          type="submit"
          className="secondary-btn w-full"
          disabled={isGenerating}
          onClick={generatePodcast}
        >
          {isGenerating ? <Loader size={1} bounce={false} text="Generating" /> : 'Generate'}
        </Button>
      </div>

      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast
