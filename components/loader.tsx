import { cn } from '@/lib/utils'
import { Circle } from 'lucide-react'

const Loader = ({
  text,
  textColor = 'text-white-1',
  showText = true,
  bounce = true,
  size = 7,
  isFullHeight = false,
}: {
  text?: string
  textColor?: string
  showText?: boolean
  bounce?: boolean
  size?: number
  isFullHeight?: boolean
}) => {
  return (
    <div className={cn({ 'flex-center h-screen': isFullHeight })}>
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
    </div>
  )
}

export default Loader
