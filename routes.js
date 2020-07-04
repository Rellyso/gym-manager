const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function (req, res) {
    return res.redirect('instructors') // redireciona para /instructors
})

routes.get('/instructors', function (req, res) {
    return res.render('instructors/index')
})

routes.post('/instructors', instructors.post )

routes.get('/instructors/:id', instructors.show )

routes.get('/instructors/create', function (req, res) {
    return res.render('instructors/create')
})

routes.get('/members', function (req, res) {
    return res.send('members')
})

module.exports = routes