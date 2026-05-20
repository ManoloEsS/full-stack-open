import type { FormEvent, ChangeEvent } from 'react'

interface LoginFormProps {
  handleSubmit: (_event: FormEvent) => void
  handleUsernameChange: (_event: ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (_event: ChangeEvent<HTMLInputElement>) => void
  username: string
  password: string
}

export const LoginForm = ({ handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}: LoginFormProps) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
            username
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
            password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)
