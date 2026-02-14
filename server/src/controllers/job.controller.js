import Job from "../models/job.model.js";

export const createJob=async (req,res)=>{
    const{title,company,status}=req.body;

    try{
        if(!title || !company){
            return res.status(400).json({
                message:"title and company name required"
            })
        }
    }
    catch(e){
        res.status(400).json({
            message:e.message
        })
    }
}