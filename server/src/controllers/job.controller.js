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
    const { status, search, sort, page = 1, limit = 5 } = req.query;

    const queryObject = {
      user: req.user._id,
    }; //to extract needed values

    //search by status
    if (status && status !== "all") {
      queryObject.status = status;
    }

    //search by title or company
    if (search) {
      queryObject.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    //sorting
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // //paging. if on 1st page means 1-1*5=0 means skip no jobs and display 5 since limit is 5
    // //if page=2, 2-1*5 means skip 5 and show next 5
    // const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
      .sort(sortOption)
      // .skip(skip)
      // .limit(Number(limit));
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

    if(job.user.toString() !== job.user._id.toString()){
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

    if(job.user.toString() !== job.user._id.toString()){
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