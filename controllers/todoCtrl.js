import ToDo from "../models/ToDoModel.js"
import User from "../models/userModel.js"

const todoCtrl = {
    create: async (req, res) => {
        try {
            const userId = req.userId
            const { title } = req.body
            if(!title) {
                return res.status(400).json({ msg: 'No title is given.' })
            }
            const user = await User.findById(userId) 
            const todo = new ToDo({
                user: user._id,
                title: title
            })
            
            const createdToDo = await todo.save()

            res.status(200).json(createdToDo)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addAnItem: async (req, res) => {
        try {
            const { todoId, item } = req.body
            if(!item) {
                return res.status(400).json({ msg: "No task given." })
            }
            const todoList = await ToDo.findById(todoId)

            todoList.items.push(item)

            const saved = await todoList.save()
            return res.status(200).json({ msg: "Task added!" }) 
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    removeAnItem: async (req, res) => {
        try {
            const { todoId, task } = req.body
            const todoList = await ToDo.findById(todoId)
            const index = todoList.items.indexOf(task)
            todoList.items.splice(index, 1)

            const saved = await todoList.save()
            return res.status(200).json({ msg: "Task removed!" }) 
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllTodo: async (req, res) => {
        try {
            const userId = req.userId
            const todos = await ToDo.find({ user: userId })

            return res.status(200).json(todos) 
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getOneTodo: async (req, res) => {
        try {
            const { todoId } = req.body
            const todoList = await ToDo.findOne({ _id: todoId, user: req.userId })

            return res.status(200).json(todoList) 
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteOneTodo: async (req, res) => {
        try {
            const { todoId } = req.body

            const todoList = await ToDo.findOneAndDelete({ _id: todoId, user: req.userId })
            
            return res.status(200).json({ msg: "Todo list has been deleted." })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    } 
}

export default todoCtrl