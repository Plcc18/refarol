import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/subscriberID',
    {
      schema: {
        summary: 'Acess invite links and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberID: z.string(),
        }),
        response: {
          201: z.object({
            subscriberID: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberID } = request.params

      console.log(subscriberID)

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberID)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
