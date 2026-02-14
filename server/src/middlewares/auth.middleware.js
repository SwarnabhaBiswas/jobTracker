import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from "dotenv";
dotenv.config();

const protect= async (req,res,next)=>{
    let token;

    try{
        //checking if token exists and in correct fromat
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            //extracting token
            token=req.headers.authorization.split(" ")[1];

            //comparing token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            //extracting user without password field
            req.user=await User.findById(decoded.id).select("-password");

            next();
        }
        else{
            res.status(401).json({message:"Not authorised"})
        }
    }
    catch(e){
        res.status(401).json({
            message:error.message
        })
    }
}

export default protect;