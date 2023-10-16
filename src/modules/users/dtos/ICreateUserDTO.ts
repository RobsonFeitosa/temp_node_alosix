export default interface ICreateUserDTO {
  name: string
  email: string
  password: string
  old_password?: string
  settings_id?: string
}
