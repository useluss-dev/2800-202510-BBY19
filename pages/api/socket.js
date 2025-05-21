import { Server } from 'socket.io';

let io;
export default function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('Initializing server...');

        io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });

            socket.on('joinRoom', (roomId) => {
                console.log('Joining room:', roomId);
                socket.join(roomId);
            });

            socket.on('sendMessage', ({ roomId, message }) => {
                console.log('Broadcasting to:', roomId, message);
                io.to(roomId).emit('receiveMessage', message);
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('Server running');
    }

    res.end();
}
