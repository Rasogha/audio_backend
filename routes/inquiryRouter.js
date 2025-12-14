import express from 'express';
import { addInquiry,getInquiries,deleteInquiry,updateInquiry } from '../controllers/inquiryController.js';

const inquiryRouter = express.Router()

inquiryRouter.post('/', addInquiry)
inquiryRouter.get('/', getInquiries)
inquiryRouter.delete('/:id', deleteInquiry)
inquiryRouter.put('/:id', updateInquiry)

export default inquiryRouter;