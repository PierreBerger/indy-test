import { describe, it, expect, vi } from 'vitest'
import * as validatePromocode from './validatePromocode'
import { validateOrRestriction } from './validateOrRestriction'

describe('validateOrRestriction', () => {
  it('should validate when one element is true', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: true })
      .mockResolvedValueOnce({ isValid: false })

    const res = await validateOrRestriction([{ '@age': { eq: 15 } }, { '@age': { eq: 15 } }], {})
    expect(spy).toHaveBeenCalledTimes(2)
    expect(res.isValid).toBe(true)
  })

  it('should invalidate when no elements are true', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: false })
      .mockResolvedValueOnce({ isValid: false })

    const res = await validateOrRestriction([{ '@age': { eq: 15 } }, { '@age': { eq: 15 } }], {})
    expect(spy).toHaveBeenCalledTimes(2)
    expect(res.isValid).toBe(false)
  })

  it('should flatmap array of reasons', async () => {
    const spy = vi
      .spyOn(validatePromocode, 'validateRestriction')
      .mockResolvedValueOnce({ isValid: false, reasons: ['age_not_valid'] })
      .mockResolvedValueOnce({ isValid: false, reasons: ['date_not_valid'] })

    const res = await validateOrRestriction(
      [{ '@age': { eq: 15 } }, { '@date': { before: '2022-01-01', after: '2022-01-01' } }],
      {},
    )
    expect(spy).toHaveBeenCalledTimes(2)
    expect(res.reasons).toStrictEqual(['age_not_valid', 'date_not_valid'])
  })
})
