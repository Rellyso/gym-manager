const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = function (req, res) {
    let members = [...data.members]

    for (let i = 0; i < members.length; i++) {
        const services = members[i].services
        members[i] = {
            ...members[i],
            services: services.split(',')
        }
    }

    return res.render('members/index', { members })
}

exports.create = function (req, res) {
    return res.render('members/create')
}

exports.post = function (req, res) {
    // GET = req.query
    // POST = req.body -> para habilitar deve-se usar o express.urlencoded({ extended: true})
    const keys = Object.keys(req.body)

    for (let key of keys) {
        // req.body.avatar_url == ""
        if (req.body[key] == "")
            return res.send('Please fill in all fields.')
    }

    // desestruturando o req.body
    let { avatar_url, name, birth, gender, services } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    let id = Number(data.members.length + 1)

    for (let i=0; i < data.members.length; i++) {
        if (data.members[i].id >= id) {
            id = Number(data.members[i].id) + 1 
        }
        console.log(id)
    }

    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')

        return res.redirect('/members')
    })

    // return res.send(req.body)
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) {
        return res.send('Member not found!')
    }

    console.log(foundMember)

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        services: foundMember.services.split(", "),
        created_at: new Intl.DateTimeFormat('en-GB').format(foundMember.created_at),
    }

    return res.render('members/show', { member })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) {
        return res.send('Member not found!')
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }


    return res.render('members/edit.njk', { member })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {
        if (member.id == id) {
            index = foundIndex

            return true
        }
    })

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })
    console.log(id)
    return res.redirect(`members/${id}`)
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function (member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })

    return res.redirect('/members')
}