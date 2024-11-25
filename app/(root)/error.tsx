'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-32 font-bold text-white-1">Oops, Error!</h1>
      <p className="text-white-2">No worries, though! Just click the button below and try again.</p>
      <Link href={'/'} prefetch={true} className="secondary-btn rounded-lg p-3">
        Back to AiTune
      </Link>
    </div>
  )
}
