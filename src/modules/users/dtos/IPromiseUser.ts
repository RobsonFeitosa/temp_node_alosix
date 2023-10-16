import User from '../infra/typeorm/entities/User'
import UserSettings from '../infra/typeorm/entities/UserSettings'

export interface UserPromise
  extends Omit<User, 'password'>,
    Omit<UserSettings, 'getAvatarUrl'> {
  password?: string | undefined
}
