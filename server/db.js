import mongoose from 'mongoose';

function initializeDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error(
            "MONGODB_URI must be set. Did you forget to set the database connection string?",
        );
    }

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));

    return mongoose.connection;
}

const db = initializeDatabase();
export { db }; 