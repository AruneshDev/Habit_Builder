import connectToDatabase from '../../../backend/db';
import multer from 'multer';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: 'public/uploads/' });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
    try {
        const { file } = req;
        const filePath = path.join(process.cwd(), 'public', 'uploads', file.filename);
        const newPath = path.join(process.cwd(), 'public', 'uploads', file.originalname);

        fs.renameSync(filePath, newPath);

        res.status(200).json({ message: 'Profile picture uploaded successfully', path: `/uploads/${file.originalname}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload profile picture' });
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
