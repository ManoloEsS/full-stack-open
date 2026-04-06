
import express, { Request, Response } from 'express'
import { BlogModel } from '../models/blog'
import { userExtractor } from '../utils/middleware'

export const blogsRouter = express.Router()



blogsRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
    const blogs = await BlogModel.find({})
        .populate('user', {
            username: true,
            name: true,
        })

    res.json(blogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    const blog = await BlogModel.findById(id)

    if (blog === null) {
        return res.status(404).json({ error: 'blog not found' })
    }
    return res.json(blog)
})

blogsRouter.post('/', userExtractor, async (req: Request, res: Response): Promise<Response> => {
    const contentType = req.get('content-type')

    if (!contentType?.includes('application/json')) {
        return res.status(415).json({ error: 'unsupported media type' })
    }

    const user = req.user!
    //create new blog with user id
    const blog = new BlogModel(req.body)
    blog.user = user._id
    const savedBlog = await blog.save()

    //update user's blog field
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    return res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req: Request, res: Response): Promise<Response> => {
    const user = req.user!

    const toDelete = await BlogModel.findById(req.params.id)

    if (toDelete === null) {
        return res.status(204).end()
    }

    if (toDelete.user!.toString() !== user._id.toString()) {
        return res.status(401).json({ error: "unauthorized" })
    }
    await toDelete.deleteOne()

    user.blogs = user.blogs.filter((a) => a.toString() !== toDelete._id.toString())
    await user.save()

    return res.status(204).end()
})

blogsRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { likes } = req.body
    const toUpdate = await BlogModel.findByIdAndUpdate(req.params.id)
    if (!toUpdate) {
        return res.status(404).json({ error: 'not found' })
    }

    toUpdate.likes = likes

    await toUpdate.save()
    return res.json(toUpdate)
})
