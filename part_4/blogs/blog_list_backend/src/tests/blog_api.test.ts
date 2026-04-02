import { describe, test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { BlogModel, Blog } from '../models/blog'
import { initialBlogs, blogsInDb, validNonExistingId } from './test_helper'



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

describe('getting single blog', () => {
    test('succeeds with valid id', async () => {
        const notesAtStart = await blogsInDb()
        const firstNote = notesAtStart[0]

        const retrieved = await api
            .get(`/api/blogs/${firstNote.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(firstNote, retrieved.body)
    })

    test('fails with status 404 if note does not exist', async () => {
        const deletedButValid = await validNonExistingId()

        await api
            .get(`/api/blogs/${deletedButValid}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api.get(`/api/blogs/${invalidId}`).expect(400)
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

    test('created blog.likes default to 0 if not present', async () => {
        const newBlog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
        }

        const createdBlog = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(createdBlog.body.likes, 0)
    })

    test('post request body missing url field returns bad request resp', async () => {
        const noTitleBlog = {
            title: 'noUrl',
            author: 'someguy',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)
    })

    test('post request body missing title field returns bad request resp', async () => {
        const noAuthorBlog = {
            author: 'noTitle',
            url: 'some.url',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(noAuthorBlog)
            .expect(400)
    })
})


describe('deleting single blog post', () => {
    test('succesfully deleting single blog post', async () => {
        const savedBlogs = await blogsInDb()
        await api
            .delete(`/api/blogs/${savedBlogs[0].id}`)
            .expect(204)

        const afterDel = await api.get('/api/blogs')

        assert.strictEqual(afterDel.body.length, initialBlogs.length - 1)
    })
})

describe('updating a single blog', () => {
    test('successfully updating a blogs likes', async () => {
        const newLikes = {
            likes: 100
        }

        const savedBlogs = await blogsInDb()

        const id = savedBlogs[0].id

        await api
            .put(`/api/blogs/${id}`)
            .send(newLikes)

        const afterUpdate = await api.get(`/api/blogs/${id}`)

        assert.strictEqual(afterUpdate.body.likes, 100)
    })
})

after(async () => {
    await BlogModel.deleteMany({})
    await mongoose.connection.close()
})
