import type { FormEvent, ChangeEvent } from 'react'

interface NewBlogProps {
  handleNewBlog: (_event: FormEvent) => void
  handleTitleChange: (_event: ChangeEvent<HTMLInputElement>) => void
  handleAuthorChange: (_event: ChangeEvent<HTMLInputElement>) => void
  handleUrlChange: (_event: ChangeEvent<HTMLInputElement>) => void
  title: string
  author: string
  url: string
}
export const NewBlog = ({ handleNewBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}: NewBlogProps) => {

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}
