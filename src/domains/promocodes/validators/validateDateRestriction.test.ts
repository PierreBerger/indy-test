import { describe, it, expect } from 'vitest'
import type { DateRestriction } from '../promocodes.schema'
import { validateDateRestriction } from './validateDateRestriction'

describe('validateDateRestriction', () => {
  it('should validate a valid date restriction', () => {
    const dateRestriction: DateRestriction['@date'] = {
      after: '1900-01-01',
      before: '2200-01-01',
    }
    const result = validateDateRestriction(dateRestriction)

    expect(result.isValid).toBe(true)
    expect(result.reasons).toBeUndefined()
  })

  it('should invalid a passed date restriction', () => {
    const dateRestriction: DateRestriction['@date'] = {
      after: '1900-01-01',
      before: '2000-01-01',
    }

    const result = validateDateRestriction(dateRestriction)

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['date_not_valid'])
  })

  it('should invalid an upcoming date restriction', () => {
    const dateRestriction: DateRestriction['@date'] = {
      after: '1900-01-01',
      before: '2000-01-01',
    }

    const result = validateDateRestriction(dateRestriction)

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['date_not_valid'])
  })
})
