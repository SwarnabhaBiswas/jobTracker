import express from 'express';
import { createJob, getJobs } from '../controllers/job.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router=express.Router();

router.post("/",protect,createJob);
router.get("/",protect,getJobs);

export default router;