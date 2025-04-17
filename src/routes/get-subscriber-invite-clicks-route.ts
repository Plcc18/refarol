import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberID/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
          tags: ['referral'],
          params: z.object({
            subscriberID: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberID } = request.params

        const { count } = await getSubscriberInviteClicks({ subscriberID })

        return { count }
      }
    )
  }
