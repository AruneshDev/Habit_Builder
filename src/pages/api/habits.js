import connectToDatabase from '../../backend/db.js';


export default async function handler(req, res) {
    const { method } = req;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const { user } = req.query;
                const habits = await db.collection('habits').find({ user }).toArray();
                res.status(200).json({ habits });
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch habits' });
            }
            break;
        case 'POST':
            try {
                const newHabit = req.body;
                await db.collection('habits').insertOne(newHabit);
                res.status(201).json({ message: 'Habit added successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Failed to add habit' });
            }
            break;
        case 'PUT':
            try {
                const { index } = req.query;
                const updatedHabit = req.body;
                await db.collection('habits').updateOne({ index: parseInt(index) }, { $set: updatedHabit });
                res.status(200).json({ message: 'Habit updated successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Failed to update habit' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
