export interface IUser {
  _id: string
  email: string
  username: string
  password: string
  isadmin: boolean
  updateAt: string
  createAt: string
}

export interface IUserLogin {
  data: IUser
  msg: string
}