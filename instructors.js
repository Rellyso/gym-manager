const fs = require('fs')
const data = require('./data')
const { age, date } = require('./utils')

// index
exports.index = function (req, res) {
    let instructors = [...data.instructors]

    for (let i = 0; i < instructors.length; i++) {
        const services = instructors[i].services
        instructors[i] = {
            ...instructors[i],
            services: services.split(',')
        }
    }

    return res.render('instructors/index', { instructors })
}

// create
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
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
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

        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

// show
exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send('Instructor not found!')
    }

    console.log(foundInstructor)

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(", "),
        created_at: new Intl.DateTimeFormat('en-GB').format(foundInstructor.created_at),
    }

    return res.render('instructors/show', { instructor })
}

// edit 
exports.edit = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send('Instructor not found!')
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }


    return res.render('instructors/edit.njk', { instructor })
}

// put
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (instructor.id == id) {
            index = foundIndex

            return true
        }
    })

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })
    console.log(id)
    return res.redirect(`instructors/${id}`)
}

// delete

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })

    return res.redirect('/instructors')
}