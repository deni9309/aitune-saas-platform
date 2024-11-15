import { ConvexError, v } from 'convex/values'

import { mutation } from './_generated/server'

export const getUrl = mutation({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})

export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    voicePrompt: v.string(),
    views: v.number(),
    audioDuration: v.number(),
    audioStorageId: v.id('_storage'),
    imageStorageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new ConvexError('Not authenticated')

    const user = await ctx.db
      .query('users')
      .filter((u) => u.eq(u.field('email'), identity.email))
      .first()

    if (!user) throw new ConvexError('User not found')

    const podcast = await ctx.db.insert('podcasts', {
      ...args,
      user: user._id,
      author: user.name,
      authorId: user.clerkId,
      authorImageUrl: user.imageUrl,
    })

    return podcast
  },
})
