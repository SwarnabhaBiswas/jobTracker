import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/user.model.js";

const runTest= async ()=>{
    await connectDB();

    const user= new User({
        name:"Swarnabha",
        email:"swar@gmail.com",
        password:"S1B21234"
    })

    await user.save();
    console.log("saved",user);
    
    const isMatch = await user.comparePassword("S1B21234");
    console.log("Password match:", isMatch);
    
    process.exit();

}


runTest();