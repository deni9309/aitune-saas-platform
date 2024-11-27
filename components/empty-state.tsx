import Link from 'next/link'
import Image from 'next/image'

import { EmptyStateProps } from '@/types'
import { Button } from '@/components/ui/button'

const EmptyState = ({ title, buttonLink, buttonText, search }: EmptyStateProps) => {
  return (
    <section className="flex-center mb-6 size-full flex-col gap-3">
      <Image src="/icons/emptyState.svg" width={250} height={200} alt="Empty State" />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">{title}</h1>

        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search or filters to find what you&apos;re looking for
          </p>
        )}
        {buttonLink && buttonText && (
          <Button
            asChild
            className="mt-3 flex items-center justify-center gap-1 bg-orange-1 transition duration-300 hover:bg-zinc-800"
          >
            <Link href={buttonLink} prefetch={true}>
              <Image src="/icons/discover.svg" width={24} height={24} alt="discover" />
              <p className="text-16 font-extrabold text-white-1">{buttonText}</p>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default EmptyState
