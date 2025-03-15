import { redis } from '../redis/client'

interface acessInviteLinkParams {
  subscriberID: string
}

export async function acessInviteLink({ subscriberID }: acessInviteLinkParams) {
  await redis.hincrby('referral:acess-count', subscriberID, 1)
}
