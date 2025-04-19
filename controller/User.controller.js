import User from "../model/User.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

const Register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
     else if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }
    try {
        const exisitingUser = await User.findOne({email})
        if(exisitingUser){
            return res.status(400).json({
                message : "User Already exist"
            })
        }

        const user = await User.create({
            username,
            email,
            password
        })
            

        console.log(user);
        

        const token = crypto.randomBytes(4).toString("hex")
        console.log(token);
        user.verificationToken = token;
       await user.save();

        //send email
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0c7e2283a04f44",
      pass: "d993da6d6846cf"
    }
  });

  const MailerDetails = {
    from: process.env.MAILTRAP_SENDERMAIL, // sender address
    to: user.email, // list of receivers
    subject: "Verification Code", // Subject line
    text: `Please click on the link to verify your account: ${baseUrl}/api/v1/users/verify/${token}`
};
  

await transport.sendMail(MailerDetails)
res.status(201).json({
    message : "user registered succesfuly",
    success : true
})

    } catch (error) {
        res.status(400).json({
            message : "user Failed",
            success : false
        })
    }
};
//Token se Verify
const verifyUser = async(req, res)=>{
        const {token} = req.params;
        console.log(token);
if(!token){
    res.status(400).json({
        message : "Invalid Token"
    })
}
const user = await User.findOne({verificationToken: token})

if(!user){
    res.status(400).json({
        message : "No User Found Token"
    })
}

user.isVerified = true;
await user.save()

}


export { Register, verifyUser };
