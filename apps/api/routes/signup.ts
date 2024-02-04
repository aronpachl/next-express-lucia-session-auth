import express from 'express'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { db } from '../lib/db.js'
import { lucia } from '../lib/auth.js'
import { SqliteError } from 'better-sqlite3'

export const signupRouter = express.Router()

signupRouter.post('/signup', async (req, res) => {
    const username: string | null = req.body.username
    const password: string | null = req.body.password

    if (!username || !password) {
        return res.status(400).send({
            message: 'Username and password are required'
        })
    }

    const hashedPassword = await new Argon2id().hash(password)
    const userId = generateId(15)

    try {
        db.prepare('INSERT INTO user (id, username, password) VALUES(?, ?, ?)').run(userId, username, hashedPassword)

        const session = await lucia.createSession(userId, {})

        return res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize()).status(200).send({
            message: 'User created'
        })
    } catch (e) {
        if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).end()
        }

        return res.status(500).end()
    }
})
