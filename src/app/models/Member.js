const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM members`, function (err, results) {
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = ` 
            INSERT INTO members (
                name,
                avatar_url,
                birth,
                gender,
                email,
                blood,
                weight,
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!! ${err}`

            callback(results.rows[0].id)
        })
    },
    find(id, callback) {
        db.query(`
        SELECT * 
        FROM members 
        WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error!! ${err}`
            
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET
                name=($1),
                avatar_url=($2),
                birth=($3),
                gender=($4),
                email=($5),
                blood=($6),
                weight=($7),
                height=($8)
            WHERE id = $9
        `

        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function (err) {
            if (err) throw `Database error!! ${err}`

            callback()
        })
    },
    instructorSelectOptions(callback) {
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if (err) throw `Database error!! ${err}`

            callback(results.rows)
        })
    }
}