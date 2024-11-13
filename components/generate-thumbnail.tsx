'use client'

import { useRef, useState } from 'react'
import { useAction, useMutation } from 'convex/react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Loader from '@/components/loader'
import { api } from '@/convex/_generated/api'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { GenerateThumbnailProps } from '@/types'
import { useUploadFiles } from '@xixixao/uploadstuff/react'

const GenerateThumbnail = ({
  setImageStorageId,
  setImage,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const { toast } = useToast()

  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const imageRef = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl)
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction)

  const handleImage = async (blob: Blob, filename: string) => {
    setIsImageLoading(true)
    setImage('')

    try {
      const file = new File([blob], filename, { type: 'image/png' })
      const uploaded = await startUpload([file])

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId
      setImageStorageId(storageId)

      const imageUrl = await getImageUrl({ storageId })
      setImage(imageUrl!)

      setIsImageLoading(false)
      toast({ title: 'Image generated successfully' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Error generating image', variant: 'destructive' })
      setIsImageLoading(false)
    }
  }

  const generateImage = async () => {
    try {
      const res = await handleGenerateThumbnail({ prompt: imagePrompt })
      const blob = new Blob([res], { type: 'image/png' })

      handleImage(blob, `thumbnail-${uuidv4()}`)
    } catch (error) {
      console.error(error)
      toast({ title: 'Error generating thumbnail', variant: 'destructive' })
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      const files = e.target.files
      if (!files || files.length === 0) return

      const file = files[0]
      const blob = await file.arrayBuffer().then((data) => new Blob([data]))

      handleImage(blob, file.name)
    } catch (error) {
      console.error(error)
      toast({ title: 'Error uploading image', variant: 'destructive' })
    }
  }

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          className={cn(
            'bg-black-1 transition hover:brightness-125',
            isAiThumbnail && 'bg-black-6',
          )}
          onClick={() => setIsAiThumbnail(true)}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          className={cn(
            'bg-black-1 transition hover:brightness-125',
            !isAiThumbnail && 'bg-black-6',
          )}
          onClick={() => setIsAiThumbnail(false)}
        >
          Use custom image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label htmlFor="imagePrompt" className="text-16 font-bold text-white-1">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              id="imagePrompt"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={5}
              placeholder="Provide text to generate thumbnail..."
              className="input-class focus-visible:ring-offset-orange-1"
            />
          </div>

          <div className="max-w-[200px]">
            <Button
              type="submit"
              className="secondary-btn w-full"
              disabled={isImageLoading}
              onClick={generateImage}
            >
              {isImageLoading ? <Loader size={4} bounce={false} text="Generating" /> : 'Generate'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef.current?.click()}>
          <Input type="file" onChange={(e) => uploadImage(e)} ref={imageRef} className="hidden" />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt="Image upload"
              className="transition hover:brightness-150"
            />
          ) : (
            <Loader text="Uploading" textColor="text-orange-200" />
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to Upload</h2>
            <p className="text-12 text-center font-normal text-gray-1">
              JPG, SVG, PNG or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}

      {image && (
        <div className="flex-center w-full">
          <Image src={image} width={200} height={200} alt="Thumbnail" className="mt-5" />
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail
