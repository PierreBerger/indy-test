import { describe, it, expect, vi } from 'vitest'
import * as validatePromocode from './validatePromocode'
import { validateAndRestriction } from './validateAndRestriction'

describe('validateAndRestriction', () => {
  it('should validate when all elements are true', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: true })
      .mockResolvedValueOnce({ isValid: true })

    const res = await validateAndRestriction([{ '@age': { eq: 15 } }, { '@age': { eq: 15 } }], {})
    expect(spy).toHaveBeenCalledTimes(2)
    expect(res.isValid).toBe(true)
  })

  it('should validate when element is true', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: true })

    const res = await validateAndRestriction([{ '@age': { eq: 15 } }], {})
    expect(spy).toHaveBeenCalledOnce()
    expect(res.isValid).toBe(true)
  })

  it('should invalidate when at least one elements is false', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: false })
      .mockResolvedValueOnce({ isValid: true })

    const res = await validateAndRestriction([{ '@age': { eq: 15 } }, { '@age': { eq: 15 } }], {})
    expect(spy).toHaveBeenCalledTimes(2)
    expect(res.isValid).toBe(false)
  })
})
