import { redis } from '../redis/client'

interface AcessInviteLinkParams {
  subscriberID: string
}

export async function acessInviteLink({ subscriberID }: AcessInviteLinkParams) {
  await redis.hincrby('referral:acess-count', subscriberID, 1)
}
