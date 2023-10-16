import { container, delay } from 'tsyringe'

import ICalculatorProvider from './CalculatorEngineProvider/models/ICalculatorProvider'
import CalculatorProvider from './CalculatorEngineProvider/implementations/CalculatorProvider'

import IInterpretationProvider from './CalculatorEngineProvider/models/IInterpretationProvider'
import InterpretationProvider from './CalculatorEngineProvider/implementations/InterpretationProvider'

import IFertilizingProvider from './CalculatorEngineProvider/models/IFertilizingProvider'
import FertilizingProvider from './CalculatorEngineProvider/implementations/FertilizingProvider'

import ExtractProvider from './ParseProvider/implementations/ExtractProvider'
import IExtractProvider from './ParseProvider/models/IExtractProvider'

container.registerSingleton<IExtractProvider>(
  'ExtractProvider',
  delay(() => ExtractProvider),
)

container.registerSingleton<ICalculatorProvider>(
  'CalculatorProvider',
  CalculatorProvider,
)

container.registerSingleton<IInterpretationProvider>(
  'InterpretationProvider',
  InterpretationProvider,
)

container.registerSingleton<IFertilizingProvider>(
  'FertilizingProvider',
  FertilizingProvider,
)
