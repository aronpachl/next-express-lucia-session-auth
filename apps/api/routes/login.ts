import express from 'express'
import { DatabaseUser, db } from '../lib/db.js'
import { Argon2id } from 'oslo/password'
import { lucia } from '../lib/auth.js'

export const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
    const username: string = req.body.username
    const password: string = req.body.password

    if (!username || !password) {
        return res.status(400).send({
            message: 'Username and password are required'
        })
    }

    const existingUser = db.prepare('SELECT * FROM user WHERE username = ?').get(username) as DatabaseUser | undefined

    if (!existingUser) {
        return res.status(400).send({
            message: 'User not found'
        })
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password)
    if (!validPassword) {
        return res.status(400).send({
            message: 'Invalid password'
        })
    }

    const session = await lucia.createSession(existingUser.id, {})

    res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
        .appendHeader('Location', '/')
        .status(200)
        .end()
})
