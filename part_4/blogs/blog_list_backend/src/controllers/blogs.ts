import express, { Response, Request } from 'express'
import { Blog } from '../models/blog'

export const blogsRouter = express.Router()

blogsRouter.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' })
})

blogsRouter.get('/api/blogs', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then((result) => {
        res.status(201).json(result)
    })
})
