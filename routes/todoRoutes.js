import express from "express";
import todoCtrl from "../controllers/todoCtrl.js";
import protect from "../middleware/protect.js";

const router = express.Router()

//Private - User

router.post('/create', protect, todoCtrl.create)

router.post('/addItem', protect, todoCtrl.addAnItem)

router.post('/deleteItem', protect, todoCtrl.removeAnItem)

router.get('/getAllTodo', protect, todoCtrl.getAllTodo)

router.post('/getTodo', protect, todoCtrl.getOneTodo)

router.post('/delete', protect, todoCtrl.deleteOneTodo)



export default router