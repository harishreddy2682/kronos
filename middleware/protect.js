import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({ msg: "No token." })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.userId = decoded.id
        return next()
    } catch (err) {
        return res.status(401).json({ msg: err.message })
    }
}

export default protect