import type { BlogPost } from '../types'

const Blog = ({ blog }: { blog: BlogPost }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export { Blog }