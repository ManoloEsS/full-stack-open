import express, { Response, Request } from 'express'
import mongoose from 'mongoose'
import { BlogModel } from '../models/blog'

export const blogsRouter = express.Router()


blogsRouter.get('/', async (_req, res) => {
    const blogs = await BlogModel.find({})
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const blog = await BlogModel.findById(id)
        if (blog === null) {
            return res.status(404).json({ error: 'blog not found' })
        }
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error: 'invalid id' })
    }
})

blogsRouter.post('/', async (req, res, next) => {
    try {
        const contentType = req.get('content-type')

        if (!contentType?.includes('application/json')) {
            return res.status(415).json({ error: 'unsupported media type' })
        }

        const blog = new BlogModel(req.body)
        const result = await blog.save()

        res.status(201).json(result)

    } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ error: error.message })
        } else {
            next(error)
        }

    }
})

blogsRouter.delete('/:id', async (req, res) => {
    await BlogModel.findByIdAndDelete(req.params.id)

    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const { likes } = req.body
        const toUpdate = await BlogModel.findByIdAndUpdate(req.params.id)
        if (!toUpdate) {
            return res.status(404).json({ error: 'not found' })
        }

        toUpdate.likes = likes

        await toUpdate.save()
        res.json(toUpdate)
    } catch (error) {
        next(error)
    }
})

export const healthRouter = express.Router()

healthRouter.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok' })
})
