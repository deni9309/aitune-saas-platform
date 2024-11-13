import { cn } from '@/lib/utils'
import { Circle } from 'lucide-react'

const Loader = ({
  text,
  textColor = 'text-white-1',
  showText = true,
  bounce = true,
  size = 7,
}: {
  text?: string
  textColor?: string
  showText?: boolean
  bounce?: boolean
  size?: number
}) => {
  return (
    <span
      className={cn('flex-center gap-x-3 font-medium', textColor, {
        'animate-bounce': bounce,
      })}
    >
      {showText && <span>{text ? text : 'Loading'}</span>}
      <Circle size={size} className="animate-ping delay-100 ease-out" />
      <Circle size={size} className="animate-ping delay-300 ease-out" />
      <Circle size={size} className="animate-ping delay-500 ease-out" />
    </span>
  )
}

export default Loader
