const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('members/index')
    },
    create(req, res) {
        return
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            // req.body.avatar_url == ""
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')
        }
        return

    },
    show(req, res) {
        return
    },
    edit(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            // req.body.avatar_url == ""
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')
        }

        return
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    },
}
