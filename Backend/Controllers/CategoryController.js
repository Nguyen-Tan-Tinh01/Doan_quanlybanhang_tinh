const db = require('../db')

const get_category_02 = (id) => {
    return new Promise((resolve) => {
        sql = "SELECT * FROM category_02 WHERE id_before = ?"
        db.query(sql, [id], async (err, response) => {
            data = []
            response.map((value) => {
                text = {
                    "id": value.id,
                    "name": value.name
                }
                data.push(text)
            })
            return resolve(data)

        })
    })


}
module.exports = {
    get: (req, res) => {
        try {
            const sql = "SELECT * FROM category"
            db.query(sql, async (err, response) => {
                if (err) return res.status(500).json({ "server": "err" })

                const data = await response.map(async (value) => {

                    category_02 = await get_category_02(value.id)

                    text = {
                        "id": value.id,
                        "name": value.name,
                        "image": value.image,
                        "category_02": category_02
                    }

                    return (text)

                })

                const category = await Promise.all(data)
                return res.status(200).json({ "data": category })
            })
        } catch (error) {
            return res.status(500).json({ "server": "err" })
        }
    },
    add_02: (req, res) => {
        try {
            const id = req.body.id
            const name = req.body.name

            const sql = "INSERT INTO category_02 (name, id_before) VALUES (? , ?)"
            db.query(sql, [name, id], (err, _res) => {
                if (err) {
                    return res.status(500).json("error")
                }

                return res.status(200).json({ id: _res.insertId })

            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    edit_02: (req, res) => {
        try {
            const id = req.body.id
            const name = req.body.name

            const sql = "UPDATE category_02 SET name = ? WHERE id = ?"
            db.query(sql, [name, id], (err) => {
                if (err) {
                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    del_02: (req, res) => {
        try {
            const id = req.body.id
            const sql = "DELETE FROM category_02 WHERE id = ?"
            db.query(sql, [id], (err) => {
                if (err) {
                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    edit: (req, res) => {
        try {
            const name = req.body.name
            const id = req.body.id
            const image = req.body.image
            const sql = "UPDATE category SET name = ?, image = ? WHERE id = ?"
            db.query(sql, [name, image, id], (err) => {
                if (err) return res.status(500).json("error")
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    }
}