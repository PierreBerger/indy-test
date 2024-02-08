import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreatePromocodeSchema, ValidatePromocodeRequestSchema } from './promocodes.schema'
import { createPromocode, findPromocodeByName } from './promocodes.db'
import { validatePromocode } from './validators/validatePromocode'

export const createPromocodeHandler = async (
  req: FastifyRequest<{ Body: CreatePromocodeSchema }>,
  reply: FastifyReply,
) => {
  const promocode = await createPromocode(req.server.prisma, req.body)
  const response = {
    id: promocode.id,
    promocode_name: promocode.name,
    advantage: { percent: promocode.advantage },
    restrictions: JSON.parse(promocode.restrictions),
  }
  reply.code(201).send(response)
}

export const validatePromocodeHandler = async (
  req: FastifyRequest<{ Body: ValidatePromocodeRequestSchema }>,
  reply: FastifyReply,
) => {
  const { promocode_name, arguments: args } = req.body

  const maybePromocode = await findPromocodeByName(req.server.prisma, promocode_name)

  if (!maybePromocode) {
    return reply.code(404).send({ message: 'Promocode not found' })
  }

  const promocodeValidationRes = await validatePromocode(
    JSON.parse(maybePromocode.restrictions),
    args,
  )

  if (promocodeValidationRes.isValid === true) {
    return reply.code(200).send({
      promocode_name: maybePromocode.name,
      status: 'accepted',
      advantage: {
        percent: maybePromocode.advantage,
      },
    })
  }

  return reply.code(403).send({
    promocode_name: maybePromocode.name,
    status: 'denied',
    reasons: promocodeValidationRes.reasons,
  })
}
