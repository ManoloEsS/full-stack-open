import { describe, test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { BlogModel, Blog } from '../models/blog'
import { initialBlogs } from './test_helper'



const api = supertest(app)


beforeEach(async () => {
    await BlogModel.deleteMany({})
    await BlogModel.insertMany(initialBlogs)

    // promise array, Promise.all waits until all promises are resolved
    // const blogObjects = initialBlogs
    //     .map(blog => new BlogModel(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
})

describe('getting all blogs', () => {
    test('get request to get all returns json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('get request to get all returns correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('unique identifier of blog posts is id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((element: any) => {
            assert.ok(element.id && !element._id)
        });
    })
})

describe('creating new blog', () => {
    test('post request with text content returns unsupported media resp', async () => {
        await api
            .post('/api/blogs')
            .send('name: json')
            .expect(415)
    })

    test('one blog is added to initialBlogs length', async () => {
        const newblog: Blog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
            likes: 5,
        }

        await api
            .post('/api/blogs')
            .send(newblog)
            .expect(201)

        const updatedBlogs = await api.get('/api/blogs')

        assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)
    })

    test('created blog is in database', async () => {
        const newblog: Blog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
            likes: 5,
        }

        const createdBlog = await api.post('/api/blogs').send(newblog)

        const retrievedBlog = await api.get(`/api/blogs/${createdBlog.body.id}`)

        assert.deepStrictEqual(retrievedBlog.body, createdBlog.body)
    })

})

after(async () => {
    await mongoose.connection.close()
})
