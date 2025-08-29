import 'dotenv/config';
import app from './app';
import connectToDatabase from './config/db.config';

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server is running at http://localhost:${PORT}`);
});