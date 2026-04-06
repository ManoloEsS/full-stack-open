import { BlogModel, Blog } from "../models/blog"
import { UserModel, User } from "../models/user"

//blogs
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
        .populate('user', {
            username: true,
            name: true,
        })
    return blogs.map(blog => blog.toJSON() as Blog)
}

export const validNonExistingIdBlog = async () => {
    const blog = new BlogModel({ title: "bye", author: "fye", url: "some.url" })
    await blog.save()
    await blog.deleteOne()

    return blog.id.toString()
}

//users
export const initialUsers = [
    {
        name: 'manolo',
        username: 'monchicho',
        passwordHash: 'hello123',
    },
    {
        name: 'monica',
        username: 'monchichi',
        passwordHash: 'goodbye789',
    },
    {
        name: 'savanah',
        username: 'robloxita',
        passwordHash: 'walker456',
    },
]

export const usersInDb = async () => {
    const users = await UserModel.find({})
    return users.map(u => u.toJSON() as User)
}

export const validNonExistingIdUser = async () => {
    const user = new UserModel({ name: 'haha', username: 'deleted', password: 'mamamia' })
    await user.save()
    await user.deleteOne()

    return user.id.toString()
}
