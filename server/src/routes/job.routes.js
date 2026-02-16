import express from 'express';
import { createJob, getJobs, updateJob, deleteJob} from '../controllers/job.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router=express.Router();

router.post("/",protect,createJob);
router.get("/",protect,getJobs); 
router.put("/:id",protect,updateJob);
router.delete("/:id",protect,deleteJob);

export default router;