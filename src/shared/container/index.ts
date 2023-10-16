import { container, delay } from 'tsyringe'

import '@modules/users/providers'
import '@modules/calculations/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserSettingsRepository from '@modules/users/repositories/IUserSettingsRepository'
import UserSettingsRepository from '@modules/users/infra/typeorm/repositories/UserSettingsRepository'

import IUserTransactionsRepository from '@modules/users/repositories/IUserTransactionsRepository'
import UserTransactionsRepository from '@modules/users/infra/typeorm/repositories/UserTransactionsRepository'

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository'
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository'

import IAddressRepository from '@modules/users/repositories/IAddressRepository'
import AddressRepository from '@modules/users/infra/typeorm/repositories/AddressRepository'

import ICommentRepository from '@modules/users/repositories/ICommentRepository'
import CommentRepository from '@modules/users/infra/typeorm/repositories/CommentRepository'

import ICreditCardRepository from '@modules/users/repositories/ICreditCardRepository'
import CreditCardRepository from '@modules/users/infra/typeorm/repositories/CreditCardRepository'

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import ISampleRepository from '@modules/calculations/repositories/ISampleRepository'
import SampleRepository from '@modules/calculations/infra/typeorm/repositories/SampleRepository'

import ISampleCalculatedRepository from '@modules/calculations/repositories/ISampleCalculatedRepository'
import SampleCalculatedRepository from '@modules/calculations/infra/typeorm/repositories/SampleCalculatedRepository'

import ISettingsRepository from '@modules/settings/repositories/ISettingsRepository'
import SettingsRepository from '@modules/settings/infra/typeorm/repositories/SettingsRepository'

import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository'
import CollaboratorRepository from '@modules/collaborator/infra/typeorm/repositories/CollaboratorRepository'
import IExtractorProvider2 from './providers/ExtractProvider2/models/IExtractorProvider2'
import ExtractorProvider2 from './providers/ExtractProvider2/implementations/ExtractorProvider2'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserSettingsRepository>(
  'UserSettingsRepository',
  UserSettingsRepository,
)

container.registerSingleton<IUserTransactionsRepository>(
  'UserTransactionsRepository',
  UserTransactionsRepository,
)

container.registerSingleton<ICommentRepository>(
  'CommentRepository',
  CommentRepository,
)

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
)

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
)

container.registerSingleton<ICreditCardRepository>(
  'CreditCardRepository',
  CreditCardRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)

container.registerSingleton<ISampleRepository>(
  'SampleRepository',
  SampleRepository,
)

container.registerSingleton<ISampleCalculatedRepository>(
  'SampleCalculatedRepository',
  SampleCalculatedRepository,
)

container.registerSingleton<ISettingsRepository>(
  'SettingsRepository',
  SettingsRepository,
)

container.registerSingleton<ICollaboratorRepository>(
  'CollaboratorRepository',
  CollaboratorRepository,
)
