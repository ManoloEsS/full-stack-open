export interface BlogPost {
  id: string;
  title: string;
  author: string;
  url?: string;
}

export interface NewBlogPost {
  title: string
  author?: string
  url: string
}

export interface Credentials {
  username: string
  password: string
}

export interface UserData {
  token: string
  username: string
  name: string
}

export interface NotificationObj {
  message: string;
  isError?: boolean;
}

export interface NotificationProps {
  notification: NotificationObj | null;
}
