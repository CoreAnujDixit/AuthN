import express from "express"
import { Login, Logout, Register, sendVerifyOtp, verifyOtp } from "../controllers/authController.js"
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', Logout)
router.post('/sendOTP', userAuth, sendVerifyOtp)
router.post('/verify-Account', userAuth, verifyOtp)


export default router;