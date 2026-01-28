/*
Connect to MONGO DB in 7 Simple step
1. import 'mongoose' & write async fn
2. Check if URI exist or not , if not throw error
3. Try Connecting & wait for successful connection
4. On succesful connetion clg the host 
5. if not not connected , clg the message in error 
6. exit with code 1(failure)
7. export deafult DB
*/

// step - 1
import mongoose from "mongoose";

const connectDB = async () => {

    try {
        // step - 2 
        const connString = process.env.MONGO_URI;
        if (!connString){
            throw new Error("DB Connection URI not defiend");
        }
        // step - 3
        const conn = await mongoose.connect(connString);
        // step - 4
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        // step - 5
        console.log(`Error: ${error}`)

        // exit the process
        process.exit(1)
        
    }

}

export default connectDB;