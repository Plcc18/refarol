import { redis } from '../redis/client'

interface GetSubsctiberInvitesCountParams {
  subscriberID: string
}

export async function getSubscriberInvitesCount({
  subscriberID,
}: GetSubsctiberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberID)
  return { count: count ? Number.parseInt(count) : 0 }
}
