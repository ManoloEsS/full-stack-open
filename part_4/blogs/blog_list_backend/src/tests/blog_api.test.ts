import { describe, test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { BlogModel, Blog } from '../models/blog'
import { UserModel } from '../models/user'
import { initialBlogs, blogsInDb, validNonExistingIdBlog, insertInitialBlogsWithUser } from './test_helper'
import { first } from 'lodash'



const blogApi = supertest(app)
let token: string
let testUserId: mongoose.ObjectId


beforeEach(async () => {
    await BlogModel.deleteMany({})
    await UserModel.deleteMany({})

    const userResponse = await blogApi
        .post('/api/users')
        .send({ username: 'monchicho', password: 'password' })


    const loginResponse = await blogApi
        .post('/api/login')
        .send({ username: 'monchicho', password: 'password' })

    token = loginResponse.body.token

    for (const b of initialBlogs) {
        await blogApi
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(b)
    }

    testUserId = userResponse.body.id

    // promise array, Promise.all waits until all promises are resolved
    // const blogObjects = initialBlogs
    //     .map(blog => new BlogModel(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
})

describe('getting all blogs', () => {
    test('get request to get all returns json', async () => {
        await blogApi
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('get request to get all returns correct amount of blogs', async () => {
        const response = await blogApi.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('unique identifier of blog posts is id', async () => {
        const response = await blogApi.get('/api/blogs')
        response.body.forEach((element: any) => {
            assert.ok(element.id && !element._id)
        });
    })
})

describe('getting single blog', () => {
    test('succeeds with valid id', async () => {
        const notesAtStart = await blogsInDb()
        const firstBlog = notesAtStart[0]

        const retrieved = await blogApi
            .get(`/api/blogs/${firstBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(retrieved.body.id, firstBlog.id)
        assert.strictEqual(retrieved.body.title, firstBlog.title)
        assert.strictEqual(retrieved.body.author, firstBlog.author)
        assert.strictEqual(retrieved.body.url, firstBlog.url)
        assert.strictEqual(retrieved.body.likes, firstBlog.likes)
    })

    test('fails with status 404 if blog does not exist', async () => {
        const deletedButValid = await validNonExistingIdBlog()

        await blogApi
            .get(`/api/blogs/${deletedButValid}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await blogApi.get(`/api/blogs/${invalidId}`).expect(400)
    })
})

describe('creating new blog', () => {
    test('post request with text content returns unsupported media resp', async () => {
        await blogApi
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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

        await blogApi
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newblog)
            .expect(201)

        const updatedBlogs = await blogApi.get('/api/blogs')

        assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)
    })

    test('created blog is in database', async () => {

        const newblog: Blog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
            likes: 5,
        }

        const createdBlog = await blogApi
            .post('/api/blogs')
            .send(newblog)
            .set('Authorization', `Bearer ${token}`)

        const retrievedBlog = await blogApi.get(`/api/blogs/${createdBlog.body.id}`)

        assert.deepStrictEqual(retrievedBlog.body, createdBlog.body)
    })

    test('created blog.likes default to 0 if not present', async () => {
        const newBlog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
        }

        const createdBlog = await blogApi
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)


        assert.strictEqual(createdBlog.body.likes, 0)
    })

    test('post request body missing url field returns bad request resp', async () => {
        const noTitleBlog = {
            title: 'noUrl',
            author: 'someguy',
            likes: 5
        }

        await blogApi
            .post('/api/blogs')
            .send(noTitleBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
    })

    test('post request body missing title field returns bad request resp', async () => {
        const noAuthorBlog = {
            author: 'noTitle',
            url: 'some.url',
            likes: 5
        }

        await blogApi
            .post('/api/blogs')
            .send(noAuthorBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
    })

    test('post request missing token returns 401 status code', async () => {
        const newBlog = {
            title: 'temp',
            author: 'me',
            url: 'some.url',
        }

        await blogApi
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})


describe('deleting single blog post', () => {
    test('succesfully deleting single blog post', async () => {
        const savedBlogs = await blogsInDb()
        await blogApi
            .delete(`/api/blogs/${savedBlogs[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const afterDel = await blogApi.get('/api/blogs')

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

        await blogApi
            .put(`/api/blogs/${id}`)
            .send(newLikes)

        const afterUpdate = await blogApi.get(`/api/blogs/${id}`)

        assert.strictEqual(afterUpdate.body.likes, 100)
    })
})

after(async () => {
    await BlogModel.deleteMany({})
    await mongoose.connection.close()
})
