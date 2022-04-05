import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({ msg: "No token." })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.id)
        
        req.userId = user._id

        return next()
    } catch (err) {
        return res.status(401).json({ msg: err.message })
    }
}

export default protect