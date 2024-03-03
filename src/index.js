import express from 'express'
import Database from './db/db.js'
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import chatRoutes from './routes/chat.routes.js'
import authRoutes from './routes/auth.routes.js'
import loginRoutes from './routes/login.routes.js'
import socketServer from './db/managers/chatManager.js'
import { engine } from 'express-handlebars'
import http from 'http'
//session
import session from 'express-session'
import MongoStore from 'connect-mongo'
//Path
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 
const PORT = 8080 || process.env.PORT
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Server http
const server = http.createServer(app)

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname +'/views')

//socket 
socketServer(server)

//session
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://magostina:coder3425@ecommerce.yjygogp.mongodb.net/ecommerce'
    }),
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true 
}))

//Routes
app.use('/api/prod', productsRoutes)
app.use('/api/carts', cartRoutes)
app.use('/chat', chatRoutes)
app.use('/auth', authRoutes)
app.use('/login', loginRoutes)

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
    Database.connect()
})