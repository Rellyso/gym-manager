module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    date(timestamp) {
        let date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${(date.getUTCMonth() + 1)}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    blood(type) {
        let res = ""
        switch (type) {
            case "A1": res = "A+"; break

            case "A0": res = "A-"; break

            case "B1": res = "B+"; break

            case "B0": res = "B-"; break

            case "O1": res = "O+"; break

            case "O0": res = "O-"; break

            case "AB1": res = "AB+"; break

            case "AB0": res = "AB-"; break

            default: return false
        }

        return res
    }
}