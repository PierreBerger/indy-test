import type { CreatePromocodeSchema, ValidatePromocodeRequestSchema } from '../promocodes.schema'
import type { ValidateCodeResult } from './validatePromocode'
import { validateRestriction } from './validatePromocode'

export const validateAndRestriction = async (
  restrictions: CreatePromocodeSchema['restrictions'],
  args: ValidatePromocodeRequestSchema['arguments'],
): Promise<ValidateCodeResult> => {
  const validateResults = await Promise.all(restrictions.map(r => validateRestriction(r, args)))

  return {
    isValid: validateResults.every(_ => _.isValid),
    reasons: validateResults.flatMap(_ => _.reasons || []),
  }
}
