import { container } from 'tsyringe'

import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'

import IGoogleProvider from './AuthProvider//models/IGoogleProvider'
import GoogleProvider from './AuthProvider/implementations/GoogleProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)

container.registerSingleton<IGoogleProvider>('GoogleProvider', GoogleProvider)
