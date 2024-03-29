import cors from 'cors'
import express from 'express'
import { lucia } from './lib/auth.js'
import { mainRouter } from './routes/index.js'
import { loginRouter } from './routes/login.js'
import { logoutRouter } from './routes/logout.js'
import { signupRouter } from './routes/signup.js'

const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use(async (req, res, next) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '')
    if (!sessionId) {
        res.locals.user = null
        res.locals.session = null
        return next()
    }

    const { session, user } = await lucia.validateSession(sessionId)
    if (session && session.fresh) {
        res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    }
    if (!session) {
        res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    }
    res.locals.session = session
    res.locals.user = user
    return next()
})

app.use(mainRouter, loginRouter, signupRouter, logoutRouter)

app.listen(8080)
