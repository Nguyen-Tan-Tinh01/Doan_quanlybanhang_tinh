const db = require('../db')
module.exports = {
    get: (req, res) => {
        try {
            const sql = `SELECT cart.*, user.username AS username, 
            products.name AS product_name, products.image AS product_image FROM cart INNER JOIN user ON cart.user_id = user.id 
            INNER JOIN products ON cart.product_id = products.id ORDER BY cart.date DESC`
            db.query(sql, (err, _res) => {
                if (err) {
                    return res.status(500).json({ "data": [] })
                }
                data = []
                _res.map((value) => {
                    data.push({
                        'id': value.id,
                        'product_id': value.product_id,
                        'product_name': value.product_name,
                        'username': value.username,
                        'name': value.name,
                        'address': value.address,
                        'phone': value.phone,
                        'sum_price': value.sum_price,
                        'price': value.price,
                        'status': value.status,
                        'payment': value.payment,
                        'date': value.date,
                        'product_image': value.product_image
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
            const address = req.body.address
            const phone = req.body.phone
            const status = req.body.status
            const payment = req.body.payment


            const sql = `UPDATE cart SET name = ?, address = ?, phone = ?, status = ?, payment = ? WHERE id = ?`
            db.query(sql, [name, address, phone, status, payment, id], (err) => {
                if (err) {
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
            const sql = "DELETE FROM cart WHERE id = ?"
            db.query(sql, [id], (err) => {
                if (err) return res.status(500).json("error")
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    add: (req, res) => {
        try {
            const name = req.body.username
            const price = req.body.price
            const sum_price = req.body.sum_price
            const voucher = req.body.voucher
            const phone = req.body.phone
            const product_id = req.body.product_id
            const user_id = 2
            const address = `${req.body._address}, ${req.body.address}, ${req.body.address01}`

            const sql = "INSERT INTO cart (product_id , user_id, name, address, phone, voucher, sum_price, price) VALUES (?, ?, ?, ?, ?, ?, ? , ?)"
            db.query(sql, [product_id, user_id, name, address, phone, voucher, sum_price, price], (err, _res) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json("error")
                }
                return res.status(200).json("success")
            })

        } catch (error) {
            return res.status(500).json("error")
        }

    }
}