import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import transporter from "../config/nodeMailer.js";

// Register user
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please enter all credentials",
            success: false
        });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save(); // First save

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
            //sending welcome email
            const mailOptions = {
                from : process.env.SENDER_EMAIL,
                to : user.email,
                subject : 'Welcome to RoomSpotter',
                text : `Welcome to RoomSpotter where you live find rent homes, your account has been created with email id : ${email}`,

            }
                //line of sending mail
                await transporter.sendMail(mailOptions)


        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

        console.log("New User Registered:", user);

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// Login user
const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
            success: false
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// Logout user
const Logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

//Otp sending
const sendVerifyOtp = (req, res)=>{
try{

}  catch(error){
    res.json({
        success : false,
        message : error.message
    })
}
}

// Export controllers
export { Register, Login, Logout };
 