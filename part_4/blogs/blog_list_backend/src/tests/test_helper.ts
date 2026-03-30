import { BlogModel } from "../models/blog"
export const initialBlogs = [
    {
        title: 'hello',
        author: 'manolo',
        url: 'some.url',
        likes: 5,
    },
    {
        title: 'goodbye',
        author: 'notManolo',
        url: 'goodbye.com',
        likes: 20,
    },
    {
        title: 'goodnight',
        author: 'monchichi',
        url: 'sosoft.andcuddly',
        likes: 420,
    },
]

export const blogsInDb = async () => {
    const blogs = await BlogModel.find({})
    return blogs.map(blog => blog.toJSON())
}
