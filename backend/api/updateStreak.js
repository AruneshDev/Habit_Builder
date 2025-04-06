import connectToDatabase from '../../backend/db';

export default async function handler(req, res) {
    const { method } = req;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'POST':
            try {
                const { user, streak, date } = req.body;
                await db.collection('users').updateOne(
                    { email: user },
                    { $set: { streak, lastCheckIn: date } },
                    { upsert: true }
                );
                res.status(200).json({ message: 'Streak updated successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Failed to update streak' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
