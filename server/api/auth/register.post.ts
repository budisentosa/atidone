import bcrypt from 'bcryptjs'
import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
    const { username, name, email, password } = await useValidatedBody(event, {
        username: z.string().min(3).max(50),
        name: z.string().min(1).max(100),
        email: z.string().email().optional(),
        password: z.string().min(6).max(100)
    })

    const cleanUsername = username.toLowerCase().trim()
    const cleanName = name.trim()

    // Check if user already exists
    const existingUser = await useDB().query.users.findFirst({
        where: eq(tables.users.username, cleanUsername)
    })

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists'
        })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await useDB().insert(tables.users).values({
        username: cleanUsername,
        name: cleanName,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        lastLoginAt: new Date()
    }).returning().get()

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
