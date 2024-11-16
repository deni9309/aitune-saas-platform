import { ConvexError, v } from 'convex/values'

import { mutation, query } from './_generated/server'

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

export const getAllPodcasts = query({
  handler: async (ctx) => {
    return await ctx.db.query('podcasts').order('desc').collect()
  },
})

export const getTrendingPodcasts = query({
  handler: async (ctx) => {
    const podcasts = await ctx.db.query('podcasts').collect()

    return podcasts.sort((a, b) => b.views - a.views).slice(0, 8)
  },
})

export const getPodcastsByVoiceType = query({
  args: { podcastId: v.id('podcasts') },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)

    return await ctx.db
      .query('podcasts')
      .filter((p) =>
        p.and(
          p.eq(p.field('voiceType'), podcast?.voiceType),
          p.neq(p.field('_id'), args.podcastId),
        ),
      )
      .collect()
  },
})

export const getPodcastsByAuthor = query({
  args: { authorId: v.string() },
  handler: async (ctx, args) => {
    const podcasts = await ctx.db
      .query('podcasts')
      .filter((p) => p.eq(p.field('authorId'), args.authorId))
      .collect()

    const totalViews = podcasts.reduce((acc, p) => acc + p.views, 0)

    return { podcasts, listeners: totalViews }
  },
})

export const getPodcastById = query({
  args: { podcastId: v.id('podcasts') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.podcastId)
  },
})

export const getPodcastsBySearch = query({
  args: { search: v.string() },
  handler: async (ctx, args) => {
    if (args.search === '') {
      return await ctx.db.query('podcasts').order('desc').collect()
    }

    const authorSearch = await ctx.db
      .query('podcasts')
      .withSearchIndex('search_author', (p) => p.search('author', args.search))
      .take(10)

    if (authorSearch.length > 0) {
      return authorSearch
    }

    const titleSearch = await ctx.db
      .query('podcasts')
      .withSearchIndex('search_title', (p) => p.search('podcastTitle', args.search))
      .take(10)

    if (titleSearch.length > 0) {
      return titleSearch
    }

    return await ctx.db
      .query('podcasts')
      .withSearchIndex('search_body', (p) => p.search('podcastDescription', args.search))
      .take(10)
  },
})

export const updatePodcastViews = mutation({
  args: { podcastId: v.id('podcasts') },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)

    if (!podcast) throw new ConvexError('Podcast not found')

    return await ctx.db.patch(args.podcastId, {
      views: podcast.views + 1,
    })
  },
})

export const deletePodcast = mutation({
  args: {
    podcastId: v.id('podcasts'),
    imageStorageId: v.id('_storage'),
    audioStorageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)

    if (!podcast) throw new ConvexError('Podcast not found')

    await ctx.storage.delete(args.imageStorageId)
    await ctx.storage.delete(args.audioStorageId)

    return await ctx.db.delete(args.podcastId)
  },
})
