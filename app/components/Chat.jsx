'use client';

import { useEffect, useRef, useState } from 'react';

export default function Chat({ userId, sellerId }) {
    const [messages, setMessages] = useState([
        { senderId: sellerId, content: 'Hi, this item is still available.' },
        { senderId: userId, content: 'Great, can I ask a few questions?' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = {
            senderId: userId,
            content: input,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="borde mx-auto flex h-[500px] max-w-md flex-col rounded shadow-md">
            <div className="flex-1 space-y-2 overflow-y-auto bg-[#181d25] p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[75%] rounded-md p-2 ${
                            msg.senderId === userId
                                ? 'ml-auto bg-[#F55266] text-white'
                                : 'mr-auto bg-gray-200 text-black'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-4 border-t bg-[#232933] p-3">
                <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    value={input}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-white px-3 py-2 outline-none placeholder:text-gray-400"
                />
                <button
                    onClick={handleSend}
                    className="rounded-lg bg-[#F55266] px-4 text-white hover:bg-red-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
