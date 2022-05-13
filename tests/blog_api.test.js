const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogList.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id,', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Manzanillo',
    author: 'Juan Perez',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogListAfter = await helper.blogsinDB()
  expect(blogListAfter).toHaveLength(helper.blogList.length + 1)
  const titles = blogListAfter.map(n => n.title)

  expect(titles).toContain('Manzanillo')
})

test('likes property missing, defaults to 0', async () => {
  const newBlog = {
    title: 'Pedro Brand',
    author: 'Mariano Garcia',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogListAfter = await helper.blogsinDB()

  const lastAddedBlog = blogListAfter[blogListAfter.length -1]

  expect(lastAddedBlog.likes).toBe(0)
})

describe('receive response with status code 400 if', () => {

  test('no title is sent', async () => {
    const newBlog = {
      author: 'Pablo Sanchez',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('no url is sent', async () => {
    const newBlog = {
      title: 'Cienfuegos',
      author: 'Jorge Loop',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('no url and title are sent', async () => {
    const newBlog = {
      author: 'Maria Cabrera',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})