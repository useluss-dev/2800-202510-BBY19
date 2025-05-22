'use client';
import { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import { useSession } from 'next-auth/react';

export default function Inbox() {
    const { data: session, status } = useSession();
    const currentUserId = session?.user?.id;

    const [chatRooms, setChatRooms] = useState([]);
    const [activeChat, setActiveChat] = useState(null);


    //check if user is logged in and fetch the chat rooms
    useEffect(() => {
        if (!currentUserId || status !== 'authenticated') return;

        const fetchChats = async () => {
            try {
                const res = await fetch(`/api/messages/user/${currentUserId}`);
                const data = await res.json();

                console.log('Fetched chatRooms:', data.rooms);
                setChatRooms(data.rooms || []);
            } catch (err) {
                console.error('Failed to fetch chat rooms:', err);
            }
        };

        fetchChats();
    }, [currentUserId, status]);

    if (status === 'loading') {
        return <div className="p-4 text-white">Loading session...</div>;
    }

    if (status === 'unauthenticated') {
        return <div className="p-4 text-white">Please log in to view your messages.</div>;
    }

    return (
        <div className="mx-auto mt-4 flex min-h-[calc(100vh-92px-263px)] max-w-7xl lg:min-h-[calc(100vh-140px-263px)]">
            <div className="w-[300px] overflow-y-auto border-r border-gray-500 p-4">
                <h2 className="mb-4 text-xl font-bold">Chats</h2>
                {chatRooms.length === 0 ? (
                    <p className="text-gray-400">No conversations yet.</p>
                ) : (
                    chatRooms.map((room) => (
                        <div
                            key={room.roomId}
                            className="cursor-pointer rounded bg-[#232933] p-2 hover:bg-[#F55266] hover:text-white my-2"
                            onClick={() => setActiveChat(room)}
                        >
                            <div className="font-semibold">{room.participantName || 'User'}</div>
                            <div className="text-sm text-gray-300">
                                {room.lastMessage?.content || 'No messages yet.'}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex-1 mt-12">
                {activeChat ? (
                    <Chat
                        userId={currentUserId}
                        sellerId={activeChat.participantId}
                        chatUserName={activeChat.participantName}
                    />
                ) : (
                    <div className="mt-10 text-center text-gray-500">Select a conversation</div>
                )}
            </div>
        </div>
    );
}
