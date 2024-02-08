import type { PrismaClient } from '@prisma/client'
import type { CreatePromocodeSchema } from './promocodes.schema'

export const createPromocode = (
  prisma: PrismaClient,
  promocode: CreatePromocodeSchema,
) =>
  prisma.promocode.create({
    data: {
      name: promocode.promocode_name,
      advantage: promocode.advantage.percent,
      restrictions: JSON.stringify(promocode.restrictions),
    },
  })

export const findPromocodeByName = (
  prisma: PrismaClient,
  promocodeName: string,
) =>
  prisma.promocode.findFirst({
    select: {
      name: true,
      advantage: true,
      restrictions: true,
    },
    where: {
      name: promocodeName,
    },
  })
