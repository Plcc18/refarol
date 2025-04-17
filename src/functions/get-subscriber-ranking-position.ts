import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberID: string
}

export async function getSubscriberRankingPosition({
  subscriberID,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberID)

  if (rank == null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
