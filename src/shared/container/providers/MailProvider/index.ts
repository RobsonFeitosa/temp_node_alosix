import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import IMailProvider from './models/IMailProvider'

import EtherealMailProvideer from './implementations/EtherealMailProvider'
import GatorMailProvider from './implementations/GatorMailProvider'
import SESMailProvider from './implementations/SESMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvideer),
  gator: container.resolve(GatorMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
)
