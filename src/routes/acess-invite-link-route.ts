import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/acess-invite-link'
import { redis } from '../redis/client'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberID',
    {
      schema: {
        summary: 'Acess invite links and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberID: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberID } = request.params

      await acessInviteLink({ subscriberID })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberID)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
