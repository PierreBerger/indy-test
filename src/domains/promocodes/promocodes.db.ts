import type { CreatePromocodeSchema } from './promocodes.schema'
import prisma from '../../libs/prisma'

export const createPromocode = (promocode: CreatePromocodeSchema) =>
  prisma.promocode.create({
    data: {
      name: promocode.promocode_name,
      advantage: promocode.advantage.percent,
      restrictions: JSON.stringify(promocode.restrictions),
    },
  })
