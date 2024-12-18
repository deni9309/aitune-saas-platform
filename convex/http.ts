// ===== reference link =====
// https://github.com/thomasballinger/convex-clerk-users-table/blob/main/convex/http.ts

import type { WebhookEvent } from '@clerk/backend'
import { httpRouter } from 'convex/server'
import { Webhook } from 'svix'

import { httpAction } from './_generated/server'
import { internal } from './_generated/api'
import { sliceEmail } from '@/lib/utils'

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request)
  if (!event) {
    return new Response('Error occured', {
      status: 400,
    })
  }
  switch (event.type) {
    case 'user.created':
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
        name: event.data.first_name || sliceEmail(event.data.email_addresses[0].email_address),
      })
      break
    case 'user.updated':
      await ctx.runMutation(internal.users.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
        name: event.data.first_name || sliceEmail(event.data.email_addresses[0].email_address),
      })
      break
    case 'user.deleted':
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      })
      break
    default:
      console.log('Ignored Clerk webhook event', event.type)
      break
  }

  return new Response(null, {
    status: 200,
  })
})

const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: handleClerkWebhook,
})

async function validateRequest(req: Request): Promise<WebhookEvent | undefined> {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!
  if (!webhookSecret) throw new Error('CLERK_WEBHOOK_SECRET is not defined')

  const payloadString = await req.text()
  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  }

  const wh = new Webhook(webhookSecret)
  const event = wh.verify(payloadString, svixHeaders)

  return event as unknown as WebhookEvent
}

export default http
