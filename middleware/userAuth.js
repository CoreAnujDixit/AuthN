//1.44hrs   
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({
            message: "Not authrized",
            success: false
        })
    }
    try {

        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        }
        else {
            return res.json({
                message: "Not authrized",
                success: false
            })
        }

        next();

    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }

}


export default userAuth;