import express, { Response, Request } from 'express'
import { BlogModel } from '../models/blog'

export const blogsRouter = express.Router()


blogsRouter.get('/', async (_req, res) => {
    const blogs = await BlogModel.find({})
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const blog = await BlogModel.findById(id)

    res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
    // accidentaly sent a req with test content type and 
    // it saves the id with no blog content
    // now it validates content type is json
    const contentType = req.get('content-type')
    if (!contentType?.includes('application/json')) {
        return res.status(415).json({ error: 'unsupported media type' })
    }

    const blog = new BlogModel(req.body)

    const result = await blog.save()
    res.status(201).json(result)
})

export const healthRouter = express.Router()

healthRouter.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok' })
})
