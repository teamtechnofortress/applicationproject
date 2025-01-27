import mongoose from "mongoose";
export const connectDb = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI, {
            dbName : process.env.DB_NAME,
        });
        // console.log('Db Connection sucess');
        // console.log(connection);
    }
    catch(error) {
        console.log('Db Connection failed');
        // console.log(error);
    }
}