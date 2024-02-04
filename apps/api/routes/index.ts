import express from 'express'
import { lucia } from '../lib/auth.js'

export const mainRouter = express.Router()

mainRouter.get('/', async (req, res) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '')

    if (!sessionId) {
        return res.status(401).end()
    }

    const { user, session } = await lucia.validateSession(sessionId)

    if (!user || !session) {
        return res.status(401).end()
    }

    res.send({
        username: user.username,
        userId: user.id
    })
})
