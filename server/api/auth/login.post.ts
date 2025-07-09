import bcrypt from 'bcryptjs'
import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
    const { username, password } = await useValidatedBody(event, {
        username: z.string().min(1),
        password: z.string().min(1)
    })

    const cleanUsername = username.toLowerCase().trim()

    // Find user
    const user = await useDB().query.users.findFirst({
        where: eq(tables.users.username, cleanUsername)
    })

    if (!user || !user.password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }

    // Update last login
    await useDB().update(tables.users)
        .set({ lastLoginAt: new Date() })
        .where(eq(tables.users.id, user.id))

    // Set user session
    await setUserSession(event, {
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        }
    })

    return { success: true, user: { id: user.id, username: user.username, name: user.name } }
})
