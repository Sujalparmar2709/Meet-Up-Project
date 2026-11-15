import React, { useEffect, useRef } from 'react'
import { MicOffIcon, UserIcon, VideoOffIcon } from 'lucide-react'

const VideoTile = ({
  stream,
  name,
  avatarUrl,
  isLocal = false,
  audioEnabled = true,
  videoEnabled = true,
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null
    }
  }, [stream])

  const initial = name?.charAt(0) || <UserIcon className='h-8 w-8' />

  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-2xl border
      border-slate-700 bg-slate-950 shadow-md'>
      {videoEnabled && stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className={`h-full w-full object-cover ${isLocal ? '-scale-x-100' : ''}`}
        />
      )}

      {(!videoEnabled || !stream) && (
        <div className='absolute inset-0 flex items-center justify-center'>
          {avatarUrl ? (
            <img src={avatarUrl} alt='' className='h-full w-full object-cover' />
          ) : (
            <div className='flex h-20 w-20 items-center justify-center rounded-full
              border-2 border-indigo-400/40 bg-indigo-600/20 text-2xl font-bold
              uppercase text-indigo-300'>
              {initial}
            </div>
          )}
        </div>
      )}

      <div className='absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg
        border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white'>
        {name || 'Participant'}
        {!audioEnabled && <MicOffIcon className='h-3.5 w-3.5 text-rose-400' />}
      </div>

      {!videoEnabled && (
        <div className='absolute bottom-3 right-3 flex items-center gap-1 rounded-full
          bg-slate-800/90 px-2.5 py-1 text-xs text-slate-300'>
          <VideoOffIcon className='h-3.5 w-3.5 text-rose-400' />
          Camera off
        </div>
      )}
    </div>
  )
}

export default VideoTile