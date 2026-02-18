import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  const { title, company, status } = req.body;

  try {
    if (!title || !company) {
      return res.status(400).json({
        message: "title and company name required",
      });
    }

    const job = await Job.create({
      title,
      company,
      status,
      user: req.user._id, //this is coming because the middleware has passed the whole user so we only take the id from that
    });
    res.status(201).json(job);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {

    const queryObject = {
      user: req.user._id,
    }; //to extract needed values



    const jobs = await Job.find(queryObject)
 
    const totalJobs = await Job.countDocuments(queryObject);

    res.status(200).json({
      totalJobs,
      // page: Number(page),
      jobs,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateJob= async (req,res)=>{
  try{
    const {id} = req.params;
    const job = await Job.findById(id); 

    if(!job){
      res.status(404).json({
        message: "No jobs found"
      })
    }

    if(job.user.toString() !== req.user._id.toString()){
      return res.status(401).json({
        message:"Not authorised"
      })
    }

    const {title,company,status} = req.body;

    if(title!==undefined) job.title=title;
    if(company!==undefined) job.company=company;
    if(status!==undefined) job.status=status;

    await job.save();

    res.status(200).json(job);

  }
  catch(e){
    res.status(500).json({
      message:e.message
    })
  }
}

export const deleteJob = async (req,res)=>{
  try{
    const {id} = req.params;
    const job = await Job.findById(id); 

    if(!job){
      res.status(404).json({
        message: "No jobs found"
      })
    }

    if(job.user.toString() !== req.user._id.toString()){
      return res.status(401).json({
        message:"Not authorised"
      })
    }

    await job.deleteOne();

    res.status(200).json({
      message:"Deleted successfully"
    })
  }
  catch(e){
    res.status(500).json({
      message:e.message
    })
  }
}