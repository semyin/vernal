export interface User {
  id: number
  username: string
  email: string
  passwordHash: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  pushType?: string
  pushUrl?: string
  phone?: string
}

export interface UserFilter {
  username?: string;
  email?: string
  phone?: string
}