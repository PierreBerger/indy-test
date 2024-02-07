import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreatePromocodeSchema } from './promocodes.schema'
import { createPromocode } from './promocodes.db'

export const createPromocodeHandler = async (
  req: FastifyRequest<{ Body: CreatePromocodeSchema }>,
  reply: FastifyReply,
) => {
  const promocode = await createPromocode(req.body)
  const response = {
    id: promocode.id,
    promocode_name: promocode.name,
    advantage: { percent: promocode.advantage },
    restrictions: JSON.parse(promocode.restrictions),
  }
  reply.code(201).send(response)
}
