import type {
  CreatePromocodeSchema,
  ValidatePromocodeRequestSchema,
} from '../promocodes.schema'

export type ValidateCodeResult = {
  isValid: boolean
  reasons?: unknown[]
}

export const validatePromocode = async (
  restrictions: CreatePromocodeSchema['restrictions'],
  args: ValidatePromocodeRequestSchema['arguments'],
): Promise<ValidateCodeResult> => {
  return { isValid: true }
}
