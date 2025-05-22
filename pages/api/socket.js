import { Server } from 'socket.io';
import clientPromise from '../../app/lib/mongodb';

let io;
export default async function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('[Socket.io] Initializing server...');

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);

        io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('[Socket.io] Client connected');

            socket.on('joinRoom', (roomId) => {
                console.log(`[Socket.io] Joining room: ${roomId}`);
                socket.join(roomId);
            });

            socket.on('sendMessage', async ({ roomId, message }) => {
                console.log('[Socket.io] Broadcasting to:', roomId, message);
                io.to(roomId).emit('receiveMessage', message);

                //save the message to mongo with (roomId, senderId, content, and timestamp)
                await db.collection(process.env.MONGODB_COLLECTIONM).insertOne({
                    roomId,
                    ...message,
                });

                console.log('[Socket.io] Message saved to DB');
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('[Socket.io] Server already running');
    }

    res.end();
}
