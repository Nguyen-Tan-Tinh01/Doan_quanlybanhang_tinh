const db = require('../db')
module.exports = {
    get: (req, res) => {
        try {
            const sql = "SELECT * FROM premium ORDER BY premium.discount"
            db.query(sql, (err, _res) => {
                if (err) return res.status(500).json("error")
                data = []
                _res.map((value) => {
                    data.push({
                        id: value.id,
                        name: value.name,
                        discount: value.discount,
                        condition_min_price: value.condition_min_price,
                        condition_number_cart: value.condition_number_cart
                    })
                })
                return res.status(200).json({ data: data })
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    edit: (req, res) => {
        try {
            const id = req.body.id
            const name = req.body.name
            const discount = req.body.discount
            const condition_min_price = req.body.condition_min_price
            const condition_number_cart = req.body.condition_number_cart


            const sql = `UPDATE premium SET name = ?, discount = ?, 
            condition_min_price = ?, condition_number_cart = ? WHERE id = ?`
            db.query(sql, [name, discount, condition_min_price, condition_number_cart, id], (err) => {
                if (err) {

                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    add: (req, res) => {
        try {
            const name = req.body.name
            const discount = req.body.discount
            condition_min_price = req.body.condition_min_price
            condition_number_cart = req.body.condition_number_cart

            const sql = "INSERT INTO premium (name, discount, condition_min_price, condition_number_cart) VALUES (?, ?, ?, ?)"
            db.query(sql, [name, discount, condition_min_price, condition_number_cart], (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    del: (req, res) => {
        try {
            const id = req.params.id
            const sql = "DELETE FROM premium WHERE id = ?"
            db.query(sql, [id], (err) => {
                if (err) {
                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    }
}