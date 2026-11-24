import { CalendarIcon, MessageSquareIcon, UsersIcon } from 'lucide-react'
import React from 'react'

const SessionCard = ({ session, onOpenDetails, onRejoin }) => {
  const isEnded = session.status === 'ended'
  const createdAt = new Date(session.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <article className='min-h-72 bg-white/70 backdrop-blur rounded-3xl p-6 transition-all flex flex-col justify-between gap-5 border border-slate-100/60 shadow-xs'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-xs font-mono text-slate-500 font-medium bg-slate-500/5 px-2.5 py-1 rounded-md'>
          ID: {session.meetingId}
        </span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${isEnded ? 'bg-slate-500/5 text-slate-500' : 'bg-emerald-500/10 text-emerald-600'}`}>
          <span className={`size-1.5 rounded-full ${isEnded ? 'bg-slate-400' : 'bg-emerald-500'}`} />
          {isEnded ? 'Ended' : 'Active'}
        </span>
      </div>
      <h2 className='text-xl font-medium text-slate-800'>{session.title}</h2>
      <p className='flex items-center gap-2 text-sm text-slate-400 -mt-4'>
        <CalendarIcon className='size-4' />
        {createdAt}
      </p>
      <div className='mt-auto flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3 text-sm text-slate-700'>
          <span className='flex items-center gap-2'>
            <UsersIcon className='size-5 text-blue-600' />
            {session.participants?.length || 0} Participants
          </span>
          <span className='w-px h-8 bg-slate-100' />
          <span className='flex items-center gap-2'>
            <MessageSquareIcon className='size-5 text-blue-600' />
            {session.messages?.length || 0} Messages
          </span>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={() => onOpenDetails(session.id)}
          className={`text-sm font-medium px-4 py-3.5 rounded-full border border-slate-200 text-slate-800 hover:bg-slate-50 ${isEnded ? 'w-full' : 'flex-1'} shadow-xs`}
        >
          View details
        </button>
        {!isEnded && (
          <button
            type='button'
            onClick={() => onRejoin(session.meetingId)}
            className='flex-1 text-sm font-medium px-4 py-2.5 rounded-full bg-primary text-white hover:bg-primary-hover'
          >
            Rejoin
          </button>
        )}
      </div>
    </article>
  )
}

export default SessionCard