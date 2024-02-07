import type { Prisma } from '@prisma/client'
import { cleanupDb } from '../test/utils/db.util'
import prisma from '../src/libs/prisma'
import data from './data.json'

const rawPromocodes: RawPromocode[] = data satisfies RawPromocode[]

interface RawPromocode {
  name: string
  avantage: {
    percent: number
  }
  restrictions: unknown
}

const promoCodes: Prisma.PromocodeCreateInput[] = rawPromocodes.map(
  promocode => ({
    name: promocode.name,
    advantage: promocode.avantage.percent,
    restrictions: JSON.stringify(promocode.restrictions),
  }),
)

async function seed() {
  console.log('🌱 Seeding...')
  console.time(`🌱 Database has been seeded`)

  console.time('🧹 Cleaned up the database...')
  await cleanupDb(prisma)
  console.timeEnd('🧹 Cleaned up the database...')

  console.time(`🎟️  Created ${promoCodes.length} promocodes...`)
  for (const promoCode of promoCodes) {
    await prisma.promocode.create({
      data: promoCode,
    })
  }
  console.timeEnd(`🎟️  Created ${promoCodes.length} promocodes...`)

  console.timeEnd(`🌱 Database has been seeded`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
