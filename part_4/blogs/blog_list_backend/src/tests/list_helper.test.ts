import { test, describe } from 'node:test'
import assert from 'node:assert'
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/list_helper'
import { Blog } from '../models/blog'

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs: Blog[] = []

        assert.strictEqual(dummy(blogs), 1)
    })
})

describe('total likes', () => {
    test('when list has only one blog, equals the like of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]

        assert.strictEqual(totalLikes(listWithOneBlog), 5)
    })


    test('when list has no blogs, likes equal 0', () => {
        const listWithNoBlogs: Blog[] = []
        assert.strictEqual(totalLikes(listWithNoBlogs), 0)
    })

    test('when list has blog that doesnt have likes, likes is 0', () => {
        const listWithBlogNoLikeField = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 0,
                __v: 0

            }
        ]

        assert.strictEqual(totalLikes(listWithBlogNoLikeField), 0)
    })

    test('when a bigger list is calculated right', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ]

        assert.strictEqual(totalLikes(blogs), 36)
    })

})

describe('favoriteBlog', () => {
    test('when a list has no blogs', () => {
        const noBlogList: Blog[] = []
        assert.strictEqual(favoriteBlog(noBlogList), null)
    })

    test('when a list has many blogs', () => {
        const blogList = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ]

        const favorite = {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
        assert.deepStrictEqual(favoriteBlog(blogList), favorite)
    })

    test('when a list has many blogs that have the same likes returns first one', () => {
        const blogList = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 5,
                __v: 0
            }
        ]

        const favorite = {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 5,
            __v: 0
        }

        assert.deepStrictEqual(favoriteBlog(blogList), favorite)
    })
})

describe('mostBlogs', () => {
    test('when many blogs returns author with most number and number of blogs', () => {
        const blogList = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 5,
                __v: 0
            }
        ]
        assert.deepStrictEqual(mostBlogs(blogList), { author: 'Robert C. Martin', blogs: 3 })

    })

    test('when list contains no blogs returns null', () => {
        const noBlogList: Blog[] = []
        assert.strictEqual(mostBlogs(noBlogList), null)
    })

    test('when list contains many top bloggers returns any of them', () => {
        const blogList = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 5,
                __v: 0
            }
        ]

        const result = mostBlogs(blogList)
        assert.deepStrictEqual(result!.blogs, 1)
        assert.ok(['Michael Chan', 'Edsger W. Dijkstra', 'Robert C. Martin'].includes(result!.author))
    })

})

describe('mostLikes', () => {
    test('when list contains many blogs, returns the author with most likes and number of likes',
        () => {
            const blogList = [
                {
                    _id: '5a422a851b54a676234d17f7',
                    title: 'React patterns',
                    author: 'Michael Chan',
                    url: 'https://reactpatterns.com/',
                    likes: 5,
                    __v: 0
                },
                {
                    _id: '5a422aa71b54a676234d17f8',
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                    likes: 5,
                    __v: 0
                },
                {
                    _id: '5a422b3a1b54a676234d17f9',
                    title: 'Canonical string reduction',
                    author: 'Edsger W. Dijkstra',
                    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                    likes: 5,
                    __v: 0
                },
                {
                    _id: '5a422b891b54a676234d17fa',
                    title: 'First class tests',
                    author: 'Robert C. Martin',
                    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                    likes: 5,
                    __v: 0
                },
                {
                    _id: '5a422ba71b54a676234d17fb',
                    title: 'TDD harms architecture',
                    author: 'Robert C. Martin',
                    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                    likes: 5,
                    __v: 0
                },
                {
                    _id: '5a422bc61b54a676234d17fc',
                    title: 'Type wars',
                    author: 'Robert C. Martin',
                    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                    likes: 5,
                    __v: 0
                }
            ]

            assert.deepStrictEqual(mostLikes(blogList), { author: 'Robert C. Martin', likes: 15 })
        })

    test('when list contains no blogs, returns null', () => {
        const noBlogList: Blog[] = []
        assert.deepStrictEqual(mostLikes(noBlogList), null)
    })

    test('when many top bloggers, returns any of them', () => {
        const blogList = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 5,
                __v: 0
            }
        ]

        const result = mostLikes(blogList)
        assert.deepStrictEqual(result!.likes, 5)
        assert.ok(['Michael Chan', 'Edsger W. Dijkstra', 'Robert C. Martin'].includes(result!.author))
    })
})
