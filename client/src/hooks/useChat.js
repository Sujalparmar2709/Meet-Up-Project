import { useCallback, useState } from "react"
import { dummyInitialChatMessages } from "../assets/asset"

const getMessageTime = () =>
    new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date())

export const useChat = (_roomId, user) => {
    const [messages, setMessages] = useState(dummyInitialChatMessages)
    const [unreadCount, setUnreadCount] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false)

    const sendMessage = useCallback(
        (text) => {
            if (!text.trim() || !user) return;
            const message = {
                id: Date.now().toString(),
                text: text.trim(),
                senderName: user.name || user.fullName || "You",
                senderId: user.id,
                time: getMessageTime(),
            }
            setMessages((prev) => [...prev, message]);
        },
        [user]
    );
    const toggleChat = useCallback(() => {
        setIsChatOpen((prev) => {
            if (!prev) setUnreadCount(0);
            return !prev;
        })
    }, [])

    return {
        messages,
        setMessage: sendMessage,
        unreadCount,
        isChatOpen,
        toggleChat

    }
}