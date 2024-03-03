import { Router } from 'express'

const routerLogin = new Router()

routerLogin.get('/login', (req, res) =>{
    res.render('login')
})

routerLogin.get('/register', (req, res) =>{
    res.render('register')
})

routerLogin.get('/profile', (req, res) =>{
    const user = req.session.user
    res.render('profile', { user })
})

export default routerLogin