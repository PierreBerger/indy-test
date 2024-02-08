import { describe, it, expect } from 'vitest'
import { validateAgeRestriction } from './validateAgeRestriction'
import type { AgeRestriction } from '../promocodes.schema'

describe('validateAgeRestriction', () => {
  it('should not validate age restriction when age args is missing', () => {
    const ageRestriction: AgeRestriction['@age'] = {
      eq: 15,
    }
    const result = validateAgeRestriction(ageRestriction, {})
    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['age_not_valid'])
  })

  it('should not validate age restriction when age is not eq', () => {
    const ageRestriction: AgeRestriction['@age'] = {
      eq: 15,
    }
    const result = validateAgeRestriction(ageRestriction, { age: 19 })
    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['age_not_valid'])
  })

  it('should not validate age restriction when age not in range', () => {
    const ageRestriction: AgeRestriction['@age'] = {
      lt: 20,
      gt: 20,
    }

    const result = validateAgeRestriction(ageRestriction, { age: 25 })
    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['age_not_valid'])
  })

  it('should not validate age restriction when age is too high', () => {
    const ageRestriction: AgeRestriction['@age'] = {
      lt: 20,
    }

    const result = validateAgeRestriction(ageRestriction, { age: 25 })
    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['age_not_valid'])
  })

  it('should not validate age restriction when age is too low', () => {
    const ageRestriction: AgeRestriction['@age'] = {
      gt: 20,
    }

    const result = validateAgeRestriction(ageRestriction, { age: 15 })
    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['age_not_valid'])
  })

  describe('should validate all other cases', () => {
    it('equal', () => {
      const ageRestriction: AgeRestriction['@age'] = {
        eq: 15,
      }
      const result = validateAgeRestriction(ageRestriction, { age: 15 })
      expect(result.isValid).toBe(true)
      expect(result.reasons).toBeUndefined()
    })

    it('in range', () => {
      const ageRestriction: AgeRestriction['@age'] = {
        gt: 15,
        lt: 20,
      }

      const result = validateAgeRestriction(ageRestriction, { age: 18 })
      expect(result.isValid).toBe(true)
      expect(result.reasons).toBeUndefined()
    })
  })
})
