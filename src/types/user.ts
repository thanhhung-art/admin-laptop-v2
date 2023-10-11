export interface IUser {
  _id: string
  email: string
  username: string
  password: string
  isadmin: boolean
  img?: string
  phone?: string
  address?: string
  address2?: string
  updateAt: string
  createAt: string
}

export interface IUserLogin {
  data: IUser
  msg: string
}