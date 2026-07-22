import express from 'express';
import {
  getIssues,
  getIssueById,
  createIssue,
  returnIssue,
  deleteIssue
} from '../controllers/issueController.js';

const router = express.Router();

router.route('/')
  .get(getIssues)
  .post(createIssue);

router.route('/:id')
  .get(getIssueById)
  .delete(deleteIssue);

router.route('/:id/return')
  .put(returnIssue);

export default router;
