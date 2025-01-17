import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

type T = Awaited<Promise<PromiseLike<object | null>>>

const databaseLoader = () => new Promise<T>((resolve,reject)=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(String (process.env.MONGO_URI))
    .then(db => {
        console.log('Database Connection Is Established');
        resolve(db);
    })
    .catch(reject);
})

export { databaseLoader }
