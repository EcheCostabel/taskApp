import mongoose from "mongoose";

export const connnectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://mern:sCDJIaKvaZSYFgDN@cluster0.t9kx8wr.mongodb.net/')
        console.log('Db is connected')
    } catch (error) {
        console.log(error)
    }
};

// sCDJIaKvaZSYFgDN