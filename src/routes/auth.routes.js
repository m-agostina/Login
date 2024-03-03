import { Router } from 'express'

const routerAuth = new Router()

let users = [] 

routerAuth.post('/register', (req, res) => {
    const { email, password, first_name, last_name, age } = req.body
    let role = 'usuario'

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        role = 'admin'
    }

    const userNew = {
        email,
        password,
        first_name,
        last_name,
        age,
        role
    }
   
    req.session.user = userNew
    userNew.id = Math.random()
    users.push(userNew)

    res.redirect('/login/login')
})


routerAuth.post('/login', (req, res) =>{
    let userNew = req.body
    let userFound = users.find( user => {
        return user.email == userNew.email && user.password == userNew.password
    })
    if(userFound) {
        req.session.user = userFound
        res.redirect('/api/prod/products')
        return 
    }else{
        res.status(401).send('Usuario o contraseña incorrectas')
    }
})

routerAuth.get('/logout', (req, res) =>{
    req.session.destroy(err =>{
        if(err){
            res.send('Error en logout')
        }else{
            res.redirect('/login/login')
        }
    })
})

export default routerAuth
