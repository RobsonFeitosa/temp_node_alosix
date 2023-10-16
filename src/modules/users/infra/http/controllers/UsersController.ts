import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateUserService'
import CreateMigrateUserService from '@modules/users/services/CreateMigrateUserService'
import ShowUserService from '@modules/users/services/ShowUserService'
import IndexUsersService from '@modules/users/services/IndexUsersService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import IndexCountUserService from '@modules/users/services/IndexCountUserService'
import TesteService from '@modules/users/services/TesteService'

export default class UsersController {
  public async teste(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(TesteService)

    const user = await createUser.execute({
      transactionId: '5b13dba1-1b2f-4ce1-9310-1bd17df65766',
    })

    return res.json(classToClass(user))
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute(req.body)

    return res.json(classToClass(user))
  }

  public async createMigration(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateMigrateUserService)

    await createUser.execute(req.body)

    return res.json({ migrate: 'done' })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const updateUser = container.resolve(UpdateUserService)

    const user = await updateUser.execute({ user_id, userData: request.body })

    return response.json(classToClass(user))
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename: request.file.filename,
    })

    return response.json(classToClass(user))
  }

  public async indexCount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const count = container.resolve(IndexCountUserService)

    const findCountUser = await count.execute()

    return response.json(findCountUser)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit } = request.query

    const indexUser = container.resolve(IndexUsersService)

    const users = await indexUser.execute({
      page: Number(page),
      limit: Number(limit),
    })

    return response.json(classToClass(users))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params

    const showUser = container.resolve(ShowUserService)

    const user = await showUser.execute(user_id)

    return response.json(classToClass(user))
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { user_id } = request.params

    const deleteUser = container.resolve(DeleteUserService)

    await deleteUser.execute(user_id)

    return response.status(204).send()
  }
}
