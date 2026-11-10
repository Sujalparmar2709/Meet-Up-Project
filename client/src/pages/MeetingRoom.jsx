import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyMeetingDetails, dummyUser } from '../assets/asset';
import { VideoGrid } from '../components/meeting/VideoGrid';
import useWebRTC from '../hooks/useWebRTC';
import ChatPanel from '../components/meeting/ChatPanel';
import { useChat } from '../hooks/useChat';
const Meetingroom = () => {
  const {meetingId} = useParams()
  const navigate = useNavigate()
  const userdata = dummyUser;

  const handleMeetingEnded = useCallback(() =>{
    navigate('/dashboard')
  }, [navigate])

  const{localStream, remoteUsers, audioEnabled, videoEnabled} = useWebRTC(
    meetingId,
    userdata,
    handleMeetingEnded)

  const {messages, setMessage, unreadCount, isChatOpen, toggleChat} = useChat(meetingId, userdata)

  return (
    <div className='h-screen w-screen bg-slate-100 text-slate-900 flex flex-col
    overflow-hidden relative font-sans'>

      <header className='w-full bg-white/90 backdrop-blur-md px-6 py-3 border-b 
      border-slate-200 flex items-center justify-between z-30 shadow-xs'>
        <div className='flex items-center gap-3'>
          <h2 className='text-base font-semibold text-slate-900 tracking-tight'>
            {dummyMeetingDetails.title} ({ meetingId || dummyMeetingDetails.meetingId })
          </h2>
          <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse'/>
        </div>
      </header>
      <div className='relative flex flex-1 overflow-hidden'>
        <VideoGrid
        localStream = {localStream}
        localUser={userdata}
        remoteUsers={remoteUsers}
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled} />

        <ChatPanel 
        isOpen={isChatOpen}
        onClose={toggleChat}
        messages={messages}
        onSendMessage={setMessage}
        currentUser={userdata}/>

        

      </div>
    </div>
  )
}

export default Meetingroom