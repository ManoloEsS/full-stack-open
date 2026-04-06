import express from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user'

export const usersRouter = express.Router()

usersRouter.get('/', async (_req, res) => {
    const users = await UserModel.find({}).populate('blogs', {
        title: true,
        author: true,
        url: true,
    })
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const contentType = req.get('content-type')
    if (!contentType?.includes('application/json')) {
        return res.status(415).json({ error: 'unsupported media type' })
    }

    const { name = '', username, password = '' } = req.body

    if (password?.length < 3) {
        return res.status(400).json({ error: 'password must be at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new UserModel({
        name,
        username,
        passwordHash,
    })

    const result = await newUser.save()

    res.status(201).json(result)
})
