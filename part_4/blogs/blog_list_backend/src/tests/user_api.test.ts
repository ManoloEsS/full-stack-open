import { describe, test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { BlogModel, Blog } from '../models/blog'
import { initialUsers, usersInDb, validNonExistingIdUser } from './test_helper'
import { UserModel, User } from '../models/user'


const userApi = supertest(app)


beforeEach(async () => {
    await UserModel.deleteMany({})
    await UserModel.insertMany(initialUsers)
})

describe('getting all users', () => {
    test('get request to get all returns json', async () => {
        await userApi
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('creating new users', () => {
    test('post request creates user with all fields', async () => {
        const user = {
            name: "user",
            username: "notthename",
            password: "123hshs",
        }

        const created = await userApi
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(created.body.username, user.username)
    })

    test('post request with no name creates user', async () => {
        const user = {
            username: "notthename",
            password: "123hshs",
        }

        const created = await userApi
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(created.body.username, user.username)
        assert.strictEqual(created.body.name, '')
    })

    test('post request with no username returns error', async () => {
        const user = {
            name: "user",
            password: "123hshs",
        }

        await userApi
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    test('post request with no password returns error', async () => {
        const user = {
            name: "user",
            username: "notuser",
        }

        await userApi
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('duplicate username creation returns error', async () => {
        const user = {
            username: "notthename",
            password: "123hshs",
        }

        const sameUsername = {
            username: "notthename",
            password: "hahaha12",
        }

        await userApi
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        await userApi
            .post('/api/users')
            .send(sameUsername)
            .expect(400)
    })
})

after(async () => {
    await UserModel.deleteMany({})
    await mongoose.connection.close()
})

