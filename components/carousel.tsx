'use client'

import { Podcast } from 'lucide-react'
import React, { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

import { DotButton, useDotButton } from '@/components/embla-carousel-dot-button'
import { CarouselProps } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Carousel = ({ slidesData, options }: CarouselProps) => {
  const router = useRouter()
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay || !('stopOnInteraction' in autoplay.options)) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick)
  const slides = slidesData.length > 0 ? slidesData.filter((item) => item.totalPodcasts > 0) : []

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.slice(0, 5).map((item) => (
          <figure
            key={item._id}
            className="carousel_box group"
            onClick={() =>
              router.push(`/podcasts/${item.podcasts[item.podcasts.length - 1]?.podcastId}`)
            }
          >
            <Image
              src={
                item.podcasts[item.podcasts.length - 1]?.imageUrl ||
                '/icons/podcast-placeholder.svg'
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Podcast Thumbnail"
              className="absolute size-full rounded-xl border-none object-cover transition duration-300 group-hover:scale-[.98] group-hover:brightness-125"
              priority
            />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4 *:transition *:duration-300 *:group-hover:text-white-1">
              <h2 className="text-14 font-semibold text-white-2">
                {item.podcasts[item.podcasts.length - 1]?.podcastTitle}
              </h2>
              <p className="text-12 mt-1 flex items-center gap-1 font-semibold text-white-2">
                <Podcast size={14} />
                <span className="text-orange-1">By</span>{' '}
                <span className="uppercase">{item.name}</span>
              </p>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={selectedIndex === index}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel
