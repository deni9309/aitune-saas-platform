import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-32 font-bold text-white-1">404 | Not Found</h1>
      <p className="text-white-2">Ooops, The Page You are looking for doesn&apos;t exist.</p>
      <Link href={'/'} prefetch={true} className="secondary-btn rounded-lg p-3">
        Return to AiTune
      </Link>
    </div>
  )
}
