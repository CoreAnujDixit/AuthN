import express from "express";
const router = express.Router()
import { Register,verifyUser } from "../controller/User.controller.js";


router.post("/register", Register)
router.get('/verify/:token', verifyUser)
export default router;

