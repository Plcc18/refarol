import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface subscribeToEventParams {
  name: string
  email: string
  refferrerID?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  refferrerID,
}: subscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return { subscriberID: subscribers[0].id }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  if (refferrerID) {
    await redis.zincrby('referral:ranking', 1, refferrerID)
  }

  const subscriber = result[0]

  return {
    subscriberID: subscriber.id,
  }
}
