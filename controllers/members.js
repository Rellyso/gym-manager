const fs = require('fs')
const data = require('../data.json')
const { age, date, blood } = require('../utils')

exports.index = function (req, res) {
    let members = [...data.members]

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

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')

        return res.redirect(`/members/${id}`)
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

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood(foundMember.blood)
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
        birth: date(foundMember.birth).iso
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