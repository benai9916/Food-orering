import express from 'express';

import { getMenuDetail, createMenuDetail } from "../controllers/menu.js";

const router = express.Router();

router.get('/', getMenuDetail)
router.post('/', createMenuDetail)

export default router;