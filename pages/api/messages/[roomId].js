import clientPromise from '../../../app/lib/mongodb';

export default async function handler(req, res) {
    const { roomId } = req.query;

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);

        //fetch the messages from mongo and sort them by latest timestamp
        const messages = await db
            .collection(process.env.MONGODB_COLLECTIONM)
            .find({ roomId })
            .sort({ timestamp: 1 })
            .toArray();

        res.status(200).json({ messages });
    } catch (err) {
        console.error('error fetching messages:', err);
        res.status(500).json({ error: 'failed to fetch messages' });
    }
}
