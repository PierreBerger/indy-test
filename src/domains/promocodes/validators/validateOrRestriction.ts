import type { OrRestriction, ValidatePromocodeRequestSchema } from '../promocodes.schema'
import { validateRestriction } from './validatePromocode'

export const validateOrRestriction = async (
  orRestriction: OrRestriction['@or'],
  args: ValidatePromocodeRequestSchema['arguments'],
) => {
  const validResults = await Promise.all(
    orRestriction.map(restriction => validateRestriction(restriction, args)),
  )

  if (validResults.some(_ => _.isValid))
    return {
      isValid: true,
    }

  return {
    isValid: false,
    reasons: validResults.flatMap(_ => _.reasons || []),
  }
}
