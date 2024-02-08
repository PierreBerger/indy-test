import {
  isAge,
  type CreatePromocodeSchema,
  type ValidatePromocodeRequestSchema,
  isDate,
  isMeteo,
  isAnd,
  isOr,
} from '../promocodes.schema'
import { validateAgeRestriction } from './validateAgeRestriction'
import { validateAndRestriction } from './validateAndRestriction'
import { validateDateRestriction } from './validateDateRestriction'
import { validateOrRestriction } from './validateOrRestriction'
import { validateWeatherRestriction } from './validateWeatherRestriction'

export type ValidateCodeResult = {
  isValid: boolean
  reasons?: unknown[]
}

export const validatePromocode = async (
  restrictions: CreatePromocodeSchema['restrictions'],
  args: ValidatePromocodeRequestSchema['arguments'],
): Promise<ValidateCodeResult> => validateAndRestriction(restrictions, args)

export const validateRestriction = async (
  restriction: CreatePromocodeSchema['restrictions'][0],
  args: ValidatePromocodeRequestSchema['arguments'],
): Promise<ValidateCodeResult> => {
  if (isAge(restriction)) {
    return validateAgeRestriction(restriction['@age'], args)
  }

  if (isDate(restriction)) {
    return validateDateRestriction(restriction['@date'])
  }

  if (isMeteo(restriction)) {
    return validateWeatherRestriction(restriction['@meteo'], args)
  }

  if (isAnd(restriction)) {
    return validateAndRestriction(restriction['@and'], args)
  }

  if (isOr(restriction)) {
    return validateOrRestriction(restriction['@or'], args)
  }

  throw new Error('invalid restriction')
}
