
export interface Tasks {
  _id: string
  title: string
  userId: UserId
  image: string
  description: string
  deadline: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UserId {
  _id: string
  username: string
  email: string
  password: string
  assignedTasks: number
  role: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}
