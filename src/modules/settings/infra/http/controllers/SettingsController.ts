import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSettingsService from '@modules/settings/services/CreateSettingsService'
import ShowLocationSettingsService from '@modules/settings/services/ShowLocationSettingsService'
import UpdateSettingsService from '@modules/settings/services/UpdateSettingsService'

export default class SettingsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id
    const dataSettings = req.body

    const createSettings = container.resolve(CreateSettingsService)

    const settings = await createSettings.execute({ dataSettings, userId })

    return res.json(settings)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { location } = req.params

    const showSettingsLocation = container.resolve(ShowLocationSettingsService)

    const setting = await showSettingsLocation.execute(location)

    return res.json(setting)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { location } = req.params
    const dataSetting = req.body

    const updateSettingsLocation = container.resolve(UpdateSettingsService)

    const setting = await updateSettingsLocation.execute({
      location,
      dataSetting,
    })

    return res.json(setting)
  }
}
