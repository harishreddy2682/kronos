import express from "express";
import protect from "../middleware/protect.js";
import stickyCtrl from "../controllers/stickyCtrl.js";

const router = express.Router()

// Private

router.post('/create', protect, stickyCtrl.create)

router.get('/getAll', protect, stickyCtrl.getAll)

router.post('/delete', protect, stickyCtrl.delete)

router.post('/update', protect, stickyCtrl.update)

router.post('/getOneSticky', protect, stickyCtrl.getOneSticky)



export default router