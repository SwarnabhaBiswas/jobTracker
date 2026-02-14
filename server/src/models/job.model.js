import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  company: {
    type: String,
    trim: true,
    required: true,
  },
  status:{
    type:String,
    enum:["applied","interview","offer","rejected"],
    default:"applied"
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true 
  },
},
{timestamps:true}
);

const Job= mongoose.model("Job",jobSchema);

export default Job;
