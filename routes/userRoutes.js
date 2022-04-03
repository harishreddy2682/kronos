import express from "express"
import userCtrl from "../controllers/userCtrl.js"

import protect from '../middleware/protect.js'

const router = express.Router()

router.post('/register', userCtrl.register)

router.post('/activate', userCtrl.activateAccount)

router.post('/login', userCtrl.login)

// Private
router.get('/', protect, userCtrl.isLoggedIn)

router.get('/home', protect, userCtrl.home)

router.get('/logout', protect, userCtrl.logout)


export default router