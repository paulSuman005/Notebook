import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000,
        });
        console.log(`database connected to : ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectToDatabase;