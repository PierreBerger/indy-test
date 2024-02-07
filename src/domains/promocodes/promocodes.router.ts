import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createPromocodeResponseSchema,
  createPromocodeSchema,
} from './promocodes.schema'
import { createPromocodeHandler } from './promocodes.handler'

const promocodes: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    `promocodes`,
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
}

export default promocodes
