const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connection succesful')
    } catch (e){
        console.error('Database connection error: ', e);
        process.exit(1);
    }
};

module.exports = connectDB;