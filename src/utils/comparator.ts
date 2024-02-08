import type { Compare } from '../domains/promocodes/promocodes.schema'

export const isEqual = (restriction: Compare, value: number): boolean =>
  !('eq' in restriction && restriction.eq !== undefined && value !== restriction.eq)

export const isInRange = (restriction: Compare, value: number): boolean =>
  !(
    'gt' in restriction &&
    restriction.gt !== undefined &&
    'lt' in restriction &&
    restriction.lt !== undefined &&
    (restriction.lt < value || restriction.gt > value)
  )

export const isGreaterThan = (restriction: Compare, value: number): boolean =>
  !('gt' in restriction && restriction.gt !== undefined && restriction.gt > value)

export const isLowerThan = (restriction: Compare, value: number): boolean =>
  !('lt' in restriction && restriction.lt !== undefined && restriction.lt < value)
