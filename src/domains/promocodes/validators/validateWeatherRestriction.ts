import type { MeteoRestriction, ValidatePromocodeRequestSchema } from '../promocodes.schema'

import type { ValidateCodeResult } from './validatePromocode'

export const validateWeatherRestriction = async (
  meteoRestriction: MeteoRestriction['@meteo'],
  args: ValidatePromocodeRequestSchema['arguments'],
): Promise<ValidateCodeResult> => {
  if (!args.meteo?.town) {
    return {
      isValid: false,
      reasons: ['weather_not_valid'],
    }
  }

  return {
    isValid: false,
    reasons: ['weather_not_valid'],
  }
}
