import { redis } from '../redis/client'

interface GetSubscriberInviteClicksParams {
  subscriberID: string
}

export async function getSubscriberInviteClicks({
  subscriberID,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:acess-count', subscriberID)
  return { count: count ? Number.parseInt(count) : 0 }
}
