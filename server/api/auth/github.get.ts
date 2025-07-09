export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user: githubUser }) {
    // Check if user exists by GitHub ID
    let user = await useDB().query.users.findFirst({
      where: eq(tables.users.githubId, String(githubUser.id))
    })

    if (!user) {
      // Create new user with GitHub data
      user = await useDB().insert(tables.users).values({
        username: githubUser.login,
        name: githubUser.name || githubUser.login,
        email: githubUser.email,
        githubId: String(githubUser.id),
        createdAt: new Date(),
        lastLoginAt: new Date()
      }).returning().get()
    }
    else {
      // Update last login
      await useDB().update(tables.users)
        .set({ lastLoginAt: new Date() })
        .where(eq(tables.users.id, user.id))
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        login: user.username // For GitHub compatibility
      }
    })

    return sendRedirect(event, '/todos')
  }
})
