import React, { useEffect, useState } from 'react'
import { CrownIcon, XIcon } from "lucide-react"

const SessionDetailModal = ({ session, onClose }) => {
  const [activeTab, setActiveTab] = useState("participants")

  useEffect(() => {
    if (!session) return

    setActiveTab("participants")
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [session, onClose])

  if (!session) return null

  const isEnded = session.status === "ended"
  const createdAt = new Date(session.createdAt).toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  const formatJoinedTime = (value) => {
    if (!value) return ""
    return new Date(value).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace(" AM", " AM").replace(" PM", " PM")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Session details"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-md">
                  ID: {session.meetingId}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${isEnded ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>
                  {isEnded ? "Ended" : "Active"}
                </span>
              </div>
              <h2 className="text-2xl font-medium text-slate-900 mt-3 truncate">
                {session.title || "Meeting Details"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Host: {session.host?.name || "Host"} • Created {createdAt}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close session details"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-end gap-8 mt-7 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`pb-3 text-sm cursor-pointer ${activeTab === "chat" ? "text-primary border-b-2 border-primary" : "text-slate-400"}`}
            >
              Chat Transcript ({session.messages?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("participants")}
              className={`pb-3 text-sm cursor-pointer ${activeTab === "participants" ? "text-primary border-b-2 border-primary" : "text-slate-400"}`}
            >
              Participants Log ({session.participants?.length || 0})
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 overflow-y-auto">
          {activeTab === "participants" ? (
            <div className="grid gap-3 pt-5">
              {session.participants?.map((participant) => {
                const isHost = participant.user?.id === session.host?.id
                const initials = participant.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()

                return (
                  <div key={participant.user?.id || participant.name} className="flex items-center gap-4 rounded-2xl border border-slate-100/80 px-4 py-4">
                    <div className="size-12 shrink-0 rounded-full bg-slate-100 ring-4 ring-blue-50 flex items-center justify-center text-primary font-medium">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium text-slate-800 truncate">{participant.name}</p>
                        {isHost && <CrownIcon className="size-4 text-amber-400 fill-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 truncate">{participant.user?.email}</p>
                    </div>
                    <p className="text-xs font-mono text-slate-500 shrink-0">
                      Joined: {formatJoinedTime(participant.joinedAt)}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid gap-3 pt-5">
              {session.messages?.map((message) => (
                <div key={message.id} className="rounded-2xl border border-slate-100 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">{message.senderName}</p>
                    {message.timestamp && (
                      <p className="text-xs text-slate-400">{formatJoinedTime(message.timestamp)}</p>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{message.text}</p>
                </div>
              ))}
              {!session.messages?.length && (
                <p className="py-8 text-center text-sm text-slate-400">No chat messages for this session.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SessionDetailModal