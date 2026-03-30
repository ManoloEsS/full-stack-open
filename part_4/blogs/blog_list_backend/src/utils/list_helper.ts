import { Blog } from '../models/blog'
import lodash from 'lodash'

export const dummy = (blogs: Blog[]): number => {
    return 1
}

export const totalLikes = (blogs: Blog[]): number => {
    let total = 0
    for (const blog of blogs) {
        total += blog.likes ? blog.likes : 0
    }

    return total
}

export const favoriteBlog = (blogs: Blog[]): Blog | null => {
    let maxLikes = 0
    let favorite: Blog | null = null

    if (blogs.length === 0) {
        return favorite
    }

    for (const blog of blogs) {
        if (blog.likes && blog.likes > maxLikes) {
            favorite = blog
            maxLikes = blog.likes
        }
    }

    if (maxLikes === 0) {
        return blogs[0]
    }

    return favorite
}

export const mostBlogs = (blogs: Blog[]): { author: string, blogs: number } | null => {
    if (blogs.length === 0) {
        return null
    }

    const authorBlogCounts = lodash.groupBy(blogs, (b) => b.author)
    const authorWithMostBlogs = lodash.maxBy(Object.keys(authorBlogCounts), (author) => authorBlogCounts[author])

    return {
        author: authorWithMostBlogs as string,
        blogs: authorBlogCounts[authorWithMostBlogs as string].length
    }
}

export const mostLikes = (blogs: Blog[]): { author: string, likes: number } | null => {
    if (blogs.length === 0) {
        return null
    }

    const authorBlogs = lodash.groupBy(blogs, (b) => b.author)
    let authorLikes = []
    for (const authorGroup of Object.values(authorBlogs)) {
        const totalLikes = lodash.sumBy(authorGroup, (a: Blog) => a.likes)
        authorLikes.push({ author: authorGroup[0].author, likes: totalLikes })
    }
    const authorWithMostLikes = lodash.maxBy(authorLikes, (blog) => blog.likes)

    return authorWithMostLikes || null
}
