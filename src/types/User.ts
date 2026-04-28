export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  image: string
  birthDate: string
  role: 'admin' | 'moderator' | 'user'
  company: {
    department: string
    name: string
    title: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
