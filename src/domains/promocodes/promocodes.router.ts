import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createPromocodeResponseSchema,
  createPromocodeSchema,
  validatePromocodeAcceptedResponseSchema,
  validatePromocodeDeniedResponseSchema,
  validatePromocodeRequestSchema,
} from './promocodes.schema'
import { createPromocodeHandler } from './promocodes.handler'

const baseUrl = 'promocodes'

const promocodes: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    `${baseUrl}`,
    {
      schema: {
        body: createPromocodeSchema,
        response: {
          201: createPromocodeResponseSchema,
        },
      },
    },
    createPromocodeHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    `${baseUrl}/validate`,
    {
      schema: {
        body: validatePromocodeRequestSchema,
        response: {
          200: validatePromocodeAcceptedResponseSchema,
          403: validatePromocodeDeniedResponseSchema,
        },
      },
    },
    validatePromocodeHandler,
  )
}

export default promocodes
