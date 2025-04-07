import connectToDatabase from '../../../backend/db';

export default async function handler(req, res) {
    const { method } = req;
    const { index } = req.query;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'PUT':
            try {
                const updatedHabit = req.body;
                await db.collection('habits').updateOne(
                    { index: parseInt(index) },
                    { $set: updatedHabit }
                );
                res.status(200).json({ message: 'Habit updated successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Failed to update habit' });
            }
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
