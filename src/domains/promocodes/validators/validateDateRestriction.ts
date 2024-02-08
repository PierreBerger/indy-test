import type { DateRestriction } from '../promocodes.schema'
import dayjs from 'dayjs'
import type { ValidateCodeResult } from './validatePromocode'

export const validateDateRestriction = (
  dateRestriction: DateRestriction['@date'],
): ValidateCodeResult => {
  return dayjs().isBefore(dayjs(dateRestriction.before)) &&
    dayjs().isAfter(dayjs(dateRestriction.after))
    ? {
        isValid: true,
      }
    : {
        isValid: false,
        reasons: ['date_not_valid'],
      }
}
