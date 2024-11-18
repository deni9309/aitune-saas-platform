import Link from 'next/link'

import { cn } from '@/lib/utils'

const Header = ({
  headerTitle,
  titleClassNames,
}: {
  headerTitle?: string
  titleClassNames?: string
}) => {
  return (
    <header className="flex items-center justify-between">
      {headerTitle ? (
        <h1 className={cn('text-18 font-bold text-white-1', titleClassNames)}>{headerTitle}</h1>
      ) : (
        <div />
      )}
      <Link href="/discover" prefetch={true} className="text-16 font-semibold text-orange-1">
        See All
      </Link>
    </header>
  )
}

export default Header
