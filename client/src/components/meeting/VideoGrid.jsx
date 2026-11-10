import React from 'react'
import VideoTile from './VideoTile';

export const VideoGrid = ({localStream, localUser, remoteUsers, audioEnabled, videoEnabled}) => {
    const totalParticipants = 1 + remoteUsers.length
    const gridClass = totalParticipants <= 4
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-2 lg:grid-cols-3'

    return (
        <div className='flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-6'>
            <div className={`grid w-full max-w-6xl gap-4 ${gridClass} transition-all duration-300`}>
                <VideoTile stream ={localStream}
                name={localUser?.name || "You"}
                avatarUrl={localUser?.imageUrl}
                isLocal={true}
                audioEnabled={audioEnabled}
                videoEnabled={videoEnabled}/>

                {remoteUsers.map((remote) => (
                    <VideoTile
                    key={remote.socketId}
                    stream={remote.stream}
                    name={remote.userName}
                    avatarUrl={remote.imageUrl}
                    isLocal={false}
                    audioEnabled={remote.audioEnabled}
                    videoEnabled={remote.videoEnabled}/>
                ))}
            </div>
        </div>
    )
}
