const fs = require('fs')
const data = require('./data')
const { age } = require('./utils')

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

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(", "),
        created_at: "",
    }

    console.log(instructor.age)
    return res.render('instructors/show', { instructor })
}



// update 

// delete