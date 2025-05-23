import clientPromise from '../../../../app/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { userId } = req.query;

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);

        //query the messages that belong to that user and sort by tumestamp
        const messages = await db
            .collection('messages')
            .find({
                roomId: { $regex: userId },
            })
            .sort({ timestamp: -1 })
            .toArray();

        //creating a map to store messages by roomId
        const roomMap = new Map();

        //loop through the all messages and get the last message for each room
        //if the roomId is not in the map, add it
        for (const msg of messages) {
            if (!roomMap.has(msg.roomId)) {
                const participants = msg.roomId.replace('chat_', '').split('_');
                //find the id of the other participant
                const partnerId = participants.find((id) => id !== userId);

                //prevent invalid ObjectId crash
                if (!partnerId || !ObjectId.isValid(partnerId)) {
                    console.warn('skipping invalid partnerId:', partnerId);
                    continue;
                }

                //fetch the participant document from db
                const userDoc = await db
                    .collection(process.env.MONGODB_COLLECTIONU)
                    .findOne({ _id: new ObjectId(partnerId) });

                //add room details to the map
                roomMap.set(msg.roomId, {
                    roomId: msg.roomId,
                    participantId: partnerId,
                    participantName: userDoc?.fullname || 'Unknown',
                    lastMessage: {
                        content: msg.content,
                        timestamp: msg.timestamp,
                    },
                });
            }
        }

        //return all rooms
        res.status(200).json({ rooms: Array.from(roomMap.values()) });
    } catch (err) {
        console.error('Failed to fetch messages:', err);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
}
