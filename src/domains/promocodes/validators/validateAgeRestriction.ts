import type { AgeRestriction, ValidatePromocodeRequestSchema } from '../promocodes.schema'
import { isEqual, isGreaterThan, isInRange, isLowerThan } from '../../../utils/comparator'
import type { ValidateCodeResult } from './validatePromocode'

export const validateAgeRestriction = (
  ageRestriction: AgeRestriction['@age'],
  args: ValidatePromocodeRequestSchema['arguments'],
): ValidateCodeResult => {
  if (!args.age) {
    return {
      isValid: false,
      reasons: ['age_not_valid'],
    }
  }

  const age = args.age

  const isAgeEqual = isEqual(ageRestriction, age)
  const isAgeInRange = isInRange(ageRestriction, age)
  const isAgeGreaterThan = isGreaterThan(ageRestriction, age)
  const isAgeLowerThan = isLowerThan(ageRestriction, age)

  if (!isAgeEqual || !isAgeInRange || !isAgeGreaterThan || !isAgeLowerThan) {
    return {
      isValid: false,
      reasons: ['age_not_valid'],
    }
  }

  return {
    isValid: true,
  }
}
