import { redis } from '../redis/client'

interface GetSubscriberInvitesCountParams {
  subscriberID: string
}

export async function getSubscriberInvitesCount({
  subscriberID,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberID)
  return { count: count ? Number.parseInt(count) : 0 }
}
