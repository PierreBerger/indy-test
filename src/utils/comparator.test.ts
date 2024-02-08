import { it, expect, describe } from 'vitest'
import { isEqual, isGreaterThan, isInRange, isLowerThan } from './comparator'
import type { Compare } from '../domains/promocodes/promocodes.schema'

describe('comparator', () => {
  describe('isEqual', () => {
    it('should return true when eq is absent', () => {
      const restriction: Compare = { gt: 5 }
      expect(isEqual(restriction, 5)).toBe(true)
    })

    it('should return true when eq is present and value is equal', () => {
      const restriction: Compare = { eq: 5 }
      expect(isEqual(restriction, 5)).toBe(true)
    })

    it('should return false when eq is present and value is not equal', () => {
      const restriction: Compare = { eq: 6 }
      expect(isEqual(restriction, 5)).toBe(false)
    })
  })

  describe('isInRange', () => {
    it('should return true when lg or lt are absent', () => {
      expect(isInRange({ eq: 5 }, 5)).toBe(true)
      expect(isInRange({ gt: 5 }, 5)).toBe(true)
      expect(isInRange({ lt: 5 }, 5)).toBe(true)
    })

    it('should return true when lg and lt are present and value is in range', () => {
      const restriction: Compare = { lt: 20, gt: 10 }
      expect(isInRange(restriction, 15)).toBe(true)
    })

    it('should return false when lg and lt are present and value is not in rnage', () => {
      const restriction: Compare = { lt: 20, gt: 10 }
      expect(isInRange(restriction, 25)).toBe(false)
    })
  })

  describe('isGreaterThan', () => {
    it('should return true when gt is absent', () => {
      const restriction: Compare = { eq: 5 }
      expect(isGreaterThan(restriction, 5)).toBe(true)
    })

    it('should return true when gt is present and value is greater than', () => {
      const restriction: Compare = { gt: 5 }
      expect(isGreaterThan(restriction, 6)).toBe(true)
    })

    it('should return false when gt is present and value is not greater than', () => {
      const restriction: Compare = { gt: 6 }
      expect(isGreaterThan(restriction, 5)).toBe(false)
    })
  })

  describe('isLowerThan', () => {
    it('should return true when lt is absent', () => {
      const restriction: Compare = { eq: 5 }
      expect(isLowerThan(restriction, 5)).toBe(true)
    })

    it('should return true when lt is present and value is lower than', () => {
      const restriction: Compare = { lt: 5 }
      expect(isLowerThan(restriction, 4)).toBe(true)
    })

    it('should return false when lt is present and value is not lower than', () => {
      const restriction: Compare = { lt: 6 }
      expect(isLowerThan(restriction, 7)).toBe(false)
    })
  })
})
