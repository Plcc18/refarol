import { redis } from '../redis/client'

interface GetSubsctiberInviteClicksParams {
  subscriberID: string
}

export async function getSubsctiberInviteClicks({
  subscriberID,
}: GetSubsctiberInviteClicksParams) {
  const count = await redis.hget('referral:acess-count', subscriberID)
  return { count: count ? Number.parseInt(count) : 0 }
}
