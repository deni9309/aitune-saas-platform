import Loader from '@/components/loader'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Loader size={4} bounce={false} showText={false} />
    </div>
  )
}

export default Loading
