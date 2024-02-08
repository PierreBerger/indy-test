import { fetchWeatherByCityName } from '../../../libs/openweather/openweather'
import type { MeteoRestriction, ValidatePromocodeRequestSchema } from '../promocodes.schema'
import { isEqual, isGreaterThan, isInRange, isLowerThan } from '../../../utils/comparator'
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

  try {
    const weather = await fetchWeatherByCityName(args.meteo.town)

    if (weather.weather !== meteoRestriction.is) {
      return {
        isValid: false,
        reasons: ['weather_not_valid'],
      }
    }

    const meteoRestrictionTemp = meteoRestriction.temp

    const isTempEqual = isEqual(meteoRestrictionTemp, weather.temp)
    const isTempInRange = isInRange(meteoRestrictionTemp, weather.temp)
    const isTempGreaterThan = isGreaterThan(meteoRestrictionTemp, weather.temp)
    const isTempLowerThan = isLowerThan(meteoRestrictionTemp, weather.temp)

    if (!isTempEqual || !isTempInRange || !isTempGreaterThan || !isTempLowerThan) {
      return {
        isValid: false,
        reasons: ['weather_not_valid'],
      }
    }

    return {
      isValid: true,
    }
  } catch (e) {
    console.error(e)
    return {
      isValid: false,
      reasons: ['weather_not_valid'],
    }
  }
}
