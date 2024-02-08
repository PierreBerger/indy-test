import { it, expect, describe, vi } from 'vitest'

import * as validateAgeRestriction from './validateAgeRestriction'
import * as validateWeatherRestriction from './validateWeatherRestriction'
import * as validateDateRestriction from './validateDateRestriction'
import * as validateAndRestriction from './validateAndRestriction'
import * as validateOrRestriction from './validateOrRestriction'
import { validateRestriction } from './validatePromocode'
import type { CreatePromocodeSchema } from '../promocodes.schema'

describe('validatePromocode', () => {
  describe('validateRestriction', () => {
    it('should call age restriction', async () => {
      const spy = vi
        .spyOn(validateAgeRestriction, 'validateAgeRestriction')
        .mockReturnValueOnce({ isValid: true })

      const result = await validateRestriction(
        {
          '@age': {
            eq: 10,
          },
        },
        {
          age: 10,
        },
      )

      expect(spy).toHaveBeenCalledOnce()
      expect(result.isValid).toBe(true)
    })

    it('should call date restriction', async () => {
      const spy = vi
        .spyOn(validateDateRestriction, 'validateDateRestriction')
        .mockReturnValueOnce({ isValid: true })

      const result = await validateRestriction(
        {
          '@date': {
            before: '2022-01-01',
            after: '2024-02-07',
          },
        },
        {},
      )

      expect(spy).toHaveBeenCalledOnce()
      expect(result.isValid).toBe(true)
    })

    it('should call weather restriction', async () => {
      const spy = vi
        .spyOn(validateWeatherRestriction, 'validateWeatherRestriction')
        .mockResolvedValueOnce({ isValid: true })

      const result = await validateRestriction(
        {
          '@meteo': {
            is: 'clear',
            temp: {
              eq: 15,
            },
          },
        },
        {},
      )

      expect(spy).toHaveBeenCalledOnce()
      expect(result.isValid).toBe(true)
    })

    it('should call and restriction', async () => {
      const spy = vi
        .spyOn(validateAndRestriction, 'validateAndRestriction')
        .mockResolvedValueOnce({ isValid: true })

      const result = await validateRestriction(
        {
          '@and': [
            {
              '@meteo': {
                is: 'clear',
                temp: {
                  eq: 15,
                },
              },
            },
          ],
        },
        {},
      )

      expect(spy).toHaveBeenCalledOnce()
      expect(result.isValid).toBe(true)
    })

    it('should call or restriction', async () => {
      const spy = vi
        .spyOn(validateOrRestriction, 'validateOrRestriction')
        .mockResolvedValueOnce({ isValid: true })

      const result = await validateRestriction(
        {
          '@or': [
            {
              '@meteo': {
                is: 'clear',
                temp: {
                  eq: 15,
                },
              },
            },
          ],
        },
        {},
      )

      expect(spy).toHaveBeenCalledOnce()
      expect(result.isValid).toBe(true)
    })

    it('should throw when unknown restriction', async () => {
      await expect(() =>
        validateRestriction(
          {
            '@BBB': {
              is: 'clear',
              temp: {
                eq: 15,
              },
            },
          } as unknown as CreatePromocodeSchema['restrictions'][0],

          {},
        ),
      ).rejects.toThrowError('invalid restriction')
    })
  })
})
