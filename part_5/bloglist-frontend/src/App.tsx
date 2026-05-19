import { useState, useEffect} from 'react'
import type { BlogPost, NotificationObj } from './types'
import type { UserData } from './types'
import { Blog } from './components/Blog'
import { login } from './services/login'
import { Notification } from './components/Notification'
import { create, getAllBlogs, setToken } from './services/blogs'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, setUser] = useState<UserData|null>(null)
  const [notification, setNotification] = useState<NotificationObj|null>(null)
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    getAllBlogs().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const user = await login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({
        message: 'wrong username or password',
        isError: true,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = async (event: React.FormEvent) => {
    event.preventDefault()
    try{
      const blog = await create({title, author, url})
      const fetchedBlogs = await getAllBlogs()
      setBlogs(fetchedBlogs)
      setNotification({
        message: `A new blog ${blog.title} by ${blog.author}`,
        isError: false,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setNotification({
        message: `Couldn't create blog`,
        isError: true,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const newBlog = () => (
  <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title
            <input
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
  return (
    <div>
    <h1>Blogs</h1>
    <Notification notification={notification} />
      <div>
        {user === null ? (
          <div>
            <h2>Log in to application</h2>
            {loginForm()}
          </div>
        ) : (
          <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
              <div>
                {newBlog()}
              </div>
              <div>
                {blogList()}
              </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default App
