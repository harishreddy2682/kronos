import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'
import { sendMail } from '../utils/sendMail.js'
import User from '../models/userModel.js'

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateName(name))
                return res.status(400).json({ msg: "Enter only alphabets." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email." })

            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6) return res.status(400).json({ msg: "Password must be atleast 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const otp =  otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

            const result = sendMail(email, otp)

            const verificationToken = jwt.sign({ otp, newUser }, process.env.OTP_TOKEN_SECRET, { expiresIn: '10m' })

            res.status(200).json({ verificationToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    activateAccount: async (req, res) => {
        try {
            const { otp, verificationToken } = req.body
            if (!otp) return res.status(400).json({ msg: "Enter your OTP." })

            const decoded = jwt.verify(verificationToken, process.env.OTP_TOKEN_SECRET)

            if (decoded.otp === otp) {
                const newUser = new User({...decoded.newUser, isEmailVerified: true})
                await newUser.save()
                return res.status(200).json({ msg: "Email verified!" })
            }

            return res.status(400).json({ msg: "Incorrect OTP." })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email." })

            const user = await User.findOne({ email })
            if(!user) return res.status(400).json({ msg: "Email is not registered." })

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect Password."})

            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000*60*60*60*24*1
            })
            return res.status(200).json({ name: user.name, email: user.email, isAdmin: user.isAdmin, weight: user.weight, isEmailVerified: user.isEmailVerified  })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    home: async (req, res) => {
        try {
            const userId = req.userId
            const user = await User.findOne({ _id: userId })
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    isLoggedIn: async (req, res) => {
        try {
            const userId = req.userId
            const user = await User.findOne({ _id: userId })

            return res.status(200).json({ name: user.name, email: user.email, isAdmin: user.isAdmin, weight: user.weight, isEmailVerified: user.isEmailVerified  })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('token')

            return res.json({ msg: "Logged out." }) 
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}





const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateName = (name) => {
    return name.match(/^[a-zA-Z ]{2,30}$/)
}

export default userCtrl