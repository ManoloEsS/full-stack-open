import axios from 'axios'
import type { BlogPost, NewBlogPost } from '../types'

const baseUrl = '/api/blogs'

let token: string | null = null

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

export const getAllBlogs = async () => {
  const response = await axios.get<BlogPost[]>(baseUrl)
  return response.data
}

export const create = async (newObject: NewBlogPost) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

