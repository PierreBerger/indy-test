import { z } from 'zod'

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
  z.union([
    ageRestriction,
    dateRestriction,
    meteoRestriction,
    orRestriction,
    andRestriction,
  ]),
)

const restrictionBase = z.union([
  ageRestriction,
  dateRestriction,
  meteoRestriction,
])

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
