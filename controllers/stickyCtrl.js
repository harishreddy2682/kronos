import Sticky from "../models/stickyModel.js"
import User from "../models/userModel.js"

const stickyCtrl = {
    create: async (req, res) => {
        try {
            const userId = req.userId

            const user = await User.findById(userId) 
            const sticky = new Sticky({
                user: user._id,
                title: 'Add title here...',
                content: 'Write content here...'
            })
            
            const createdSticky = await sticky.save()

            res.status(200).json({ msg: 'Sticky created!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAll: async (req, res) => {
        try {
            const userId = req.userId

            const user = await User.findById(userId) 
            const stickies = await Sticky.find({ user: user._id })
            if(!stickies) {
                return res.status(400).json({ msg: 'Could not find the stickies!' })
            }

            res.status(200).json(stickies)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.userId
            const { stickyId } = req.body

            const user = await User.findById(userId) 
            const sticky = await Sticky.findOneAndDelete({ _id:stickyId, user: user._id })
            if(!sticky) {
                return res.status(400).json({ msg: 'Could not find the sticky!' })
            }

            res.status(200).json({ msg: 'Sticky deleted!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.userId
            const { stickyId, title, content } = req.body

            if(!title) {
                return res.status(400).json({ msg: "Title cannot be empty." })
            }
            if(!content) {
                return res.status(400).json({ msg: "Content cannot be empty." })
            }

            const user = await User.findById(userId) 
            const sticky = await Sticky.findOne({ _id: stickyId, user: user._id })

            if(!sticky) {
                return res.status(400).json({ msg: 'Could not find the sticky!' })
            }

            sticky.title = title || sticky.title
            sticky.content = content || sticky.content

            const updatedSticky = await sticky.save()

            res.status(200).json({ msg: 'Sticky updated!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getOneSticky: async (req, res) => {
        try {
            const userId = req.userId
            const { stickyId } = req.body

            const user = await User.findById(userId) 
            const sticky = await Sticky.findOne({ _id: stickyId, user: user._id })
            
            if(!sticky) {
                return res.status(400).json({ msg: 'Could not find the stickies!' })
            }

            res.status(200).json(sticky)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default stickyCtrl