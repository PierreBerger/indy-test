import { z } from 'zod'

export type Compare = z.infer<typeof compare>
const compare = z
  .object({
    eq: z.number().optional(),
    gt: z.number().optional(),
    lt: z.number().optional(),
  })
  .refine(
    ({ eq, gt, lt }) => {
      if (eq !== undefined && (gt !== undefined || lt !== undefined)) {
        return false
      }
      if (eq === undefined && gt === undefined && lt === undefined) {
        return false
      }

      return true
    },
    {
      message: "Only one of 'gt' or 'lt' can be provided, or both.",
    },
  )

const dateRestriction = z.object({
  '@date': z.object({
    after: z.string(),
    before: z.string(),
  }),
})

const meteoRestriction = z.object({
  '@meteo': z.object({
    is: z.string(),
    temp: compare,
  }),
})

const ageRestriction = z.object({
  '@age': compare,
})

const orRestriction = z.object({
  '@or': z.lazy(() => z.array(restriction)),
})

const andRestriction = z.object({
  '@and': z.lazy(() => z.array(restriction)),
})

const restriction: z.ZodType<Restriction> = z.lazy(() =>
  z.union([ageRestriction, dateRestriction, meteoRestriction, orRestriction, andRestriction]),
)

const restrictionBase = z.union([ageRestriction, dateRestriction, meteoRestriction])

type Restriction =
  | z.infer<typeof restrictionBase>
  | {
      '@and': Restriction[]
    }
  | { '@or': Restriction[] }

const basePromocodeSchema = {
  promocode_name: z.string(),
  advantage: z.object({
    percent: z.number().min(1).max(100),
  }),
}

export type CreatePromocodeSchema = z.infer<typeof createPromocodeSchema>
export const createPromocodeSchema = z.object({
  ...basePromocodeSchema,
  restrictions: z.array(restriction),
})

export const createPromocodeResponseSchema = z.object({
  id: z.string(),
  ...basePromocodeSchema,
  restrictions: z.array(restriction),
})

export type ValidatePromocodeRequestSchema = z.infer<typeof validatePromocodeRequestSchema>
export const validatePromocodeRequestSchema = z.object({
  promocode_name: z.string(),
  arguments: z.object({
    age: z.number().optional(),
    meteo: z
      .object({
        town: z.string(),
      })
      .optional(),
  }),
})

export const validatePromocodeAcceptedResponseSchema = z.object({
  promocode_name: z.string(),
  status: z.literal('accepted'),
  advantage: z.object({
    percent: z.number(),
  }),
})

export const validatePromocodeDeniedResponseSchema = z.object({
  promocode_name: z.string(),
  status: z.literal('denied'),
  reasons: z.array(z.string()),
})

export type AndRestriction = z.infer<typeof andRestriction>
export type OrRestriction = z.infer<typeof orRestriction>
export type MeteoRestriction = z.infer<typeof meteoRestriction>
export type AgeRestriction = z.infer<typeof ageRestriction>
export type DateRestriction = z.infer<typeof dateRestriction>

export const isAnd = (
  restriction: Restriction,
): restriction is { '@and': AndRestriction['@and'] } => '@and' in restriction

export const isOr = (restriction: Restriction): restriction is { '@or': OrRestriction['@or'] } =>
  '@or' in restriction

export const isAge = (
  restriction: Restriction,
): restriction is { '@age': AgeRestriction['@age'] } => '@age' in restriction

export const isMeteo = (
  restriction: Restriction,
): restriction is { '@meteo': MeteoRestriction['@meteo'] } => '@meteo' in restriction

export const isDate = (
  restriction: Restriction,
): restriction is { '@date': DateRestriction['@date'] } => '@date' in restriction
