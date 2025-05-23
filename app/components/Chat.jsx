'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getSocket } from '../lib/socket';
import PropTypes from 'prop-types';

export default function Chat({ userId, sellerId, chatUserName }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const socket = getSocket();
    const participants = [userId, sellerId].sort();
    const roomId = `chat_${participants.join('_')}`;

    useEffect(() => {
        async function loadChatHistory() {
            try {
                const res = await fetch(`/api/messages/${roomId}`);
                const data = await res.json();
                if (res.ok) {
                    setMessages(data.messages);
                } else {
                    console.error('failed to load messages:', data.error);
                }
            } catch (error) {
                console.error('error loading chat history:', error);
            }
        }

        loadChatHistory();

        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });

        if (!socket.connected) {
            socket.on('connect', () => {
                console.log('Connected to socket');
                socket.emit('joinRoom', roomId);
            });
        } else {
            socket.emit('joinRoom', roomId);
        }

        socket.on('receiveMessage', (message) => {
            if (message.senderId !== userId) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('connect');
        };
    }, [roomId, socket, userId]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage = {
            senderId: userId,
            content: input,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);

        socket.emit('sendMessage', { roomId, message: newMessage });
        setInput('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="shadow-b-md mx-auto flex h-[500px] max-w-md flex-col rounded-md">
            <div className="flex-1 space-y-2 overflow-y-auto bg-[#181d25] p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[75%] rounded-md p-2 ${msg.senderId === userId ? 'ml-auto bg-[#F55266] text-white' : 'mr-auto bg-gray-200 text-black'}`}
                    >
                        <div className="mb-1 text-xs font-semibold">
                            {msg.senderId === userId ? 'You' : chatUserName}
                        </div>
                        <div>{msg.content}</div>
                        <div className="text-right text-[10px] opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-4 rounded-b-md border-t border-gray-500 bg-[#232933] p-3">
                <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    value={input}
                    placeholder="Type a message..."
                    className="flex-1 rounded-md border border-gray-500 px-3 py-2 outline-none placeholder:text-gray-400"
                />
                <button
                    onClick={handleSend}
                    className="rounded-md bg-[#F55266] px-4 text-white hover:bg-red-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

Chat.propTypes = {
    userId: PropTypes.string.isRequired,
    sellerId: PropTypes.string.isRequired,
    chatUserName: PropTypes.string.isRequired,
};
