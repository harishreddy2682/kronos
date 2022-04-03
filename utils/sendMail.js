import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

const sendMail = (to, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: to,
        subject: 'Kronos - Your one time password.',
        text: `Your OTP is - ${otp}`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            return err
        }
        return data 
        // console.log(data)
    })

}

export { sendMail }