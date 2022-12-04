const db = require('../db')
module.exports = {
    get: (req, res) => {
        try {
            const sql = "SELECT * FROM voucher"
            db.query(sql, (err, _res) => {
                if (err) return res.status(500).json("error")
                data = []
                _res.map((value) => {
                    data.push({
                        id: value.id,
                        name: value.name,
                        discount: value.discount,
                        discount_price: value.discount_price,
                        count: value.count,
                        end: value.end,
                        date: value.date.getTime()
                    })
                })
                res.status(200).json({ data: data })
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    add: (req, res) => {
        try {
            const name = req.body.name
            const count = req.body.count
            const end = req.body.end
            const discount = req.body.discount
            const discount_price = req.body.discount_price

            const sql = "INSERT INTO voucher (name, count, end, discount, discount_price) VALUES (?, ?, ?, ?, ?)"
            db.query(sql, [name, count, end, discount, discount_price], (err) => {
                if (err) return res.status(500).json("error")
                return res.status(200).json("success")
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    },
    del: (req, res) => {
        try {
            const id = req.params.id
            const sql = "DELETE FROM voucher WHERE id = ?"
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
    get_detail: (req, res) => {
        try {
            const name = req.params.id
            // console.log(name)
            const sql = "SELECT * FROM voucher WHERE name = ?"
            db.query(sql, [name], (err, _res) => {
                if (err) {
                    return res.status(500).json("error")
                }
                // console.log(_res[0])
                if (_res[0]) {
                    //Kiểm tra xem còn sử dụng được mã không
                    if (_res[0].count === 0) {
                        return res.status(500).json("error")
                    }
                    return res.status(200).json({
                        "discount": _res[0].discount,
                        "discount_price": _res[0].discount_price
                    })
                    // //Trừ bớt 1 lần sử dụng
                    // const sql = `UPDATE voucher SET count = count - 1 WHERE id = ?`
                    // db.query(sql, [id], (err) => {
                    //     if (err) return res.status(500).json("error")

                    // })
                }
                else {
                    return res.status(500).json("error")
                }
            })
        } catch (error) {
            return res.status(500).json("error")
        }
    }
}