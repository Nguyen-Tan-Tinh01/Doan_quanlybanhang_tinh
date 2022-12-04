const db = require('../db')

const get_count = (id) => {
    return new Promise((resolve) => {
        const sql = "SELECT COUNT(*) FROM cart WHERE cart.product_id = ? AND cart.status = 1"
        db.query(sql, [id], (err, response_count) => {
            if (err) throw err
            _count = 0
            if (response_count[0])
                return resolve(response_count[0]['COUNT(*)'])
            return resolve(0)
        })
    })
}

// const get_name_category = (id) => {
//     return new Promise((resolve) => {
//         const sql = "SELECT * FROM category"
//         db.query(sql, [id], (err, response_count) => {
//             if (err) throw err
//             // console.log(response_count[0])
//             data = []
//             response_count.map((value) => {
//                 data.push({
//                     id: value.id,
//                     name: value.name
//                 })
//             })
//             return resolve(data)
//         })
//     })
// }

const get_all_category = () => {
    return new Promise((resolve) => {
        const sql = "SELECT * FROM category_02"
        db.query(sql, (err, res) => {
            if (err) throw err
            categorys = []
            res.map((value) => {
                categorys.push({
                    id: value.id,
                    name: value.name
                })
            })
            return resolve(categorys)
        })
    })
}


module.exports = {
    get: (req, res) => {
        try {
            const sql = "SELECT products.*, category_02.name AS category_name FROM category_02 INNER JOIN products ON products.category_id = category_02.id;"
            db.query(sql, async (err, response) => {
                if (err) {
                    return res.status(500).json({ "data": [] })
                }
                // data = []

                // console.log(response[0].category_name)
                const get_all = response.map(async (value) => {
                    //Lấy số lượng bán ra của sản phẩm

                    return (
                        {
                            "id": value.id,
                            "name": value.name,
                            "price": value.price,
                            "count": await get_count(value.id),
                            "category_name": value.category_name,
                            "category_id": value.category_id,
                            "image": value.image,
                            "detail": value.detail
                        }
                    )
                })

                const data = await Promise.all(get_all)
                const categorys = await get_all_category()



                // console.log(data)
                return res.status(200).json(
                    {
                        "data": data,
                        "categorys": categorys
                    }
                )
            })
        } catch (error) {
            return res.status(500).json({ "data": [] })
        }
    },
    //Lấy sản phẩm bán chạy nhất
    trend: (req, res) => {
        const sql = "SELECT *,product_id,COUNT(*) FROM orders INNER JOIN products ON products.id=product_id GROUP BY product_id LIMIT 10"

        db.query(sql, async (err, response) => {
            data = []
            response.map(async (value) => {

                data.push({
                    "count": value['COUNT(*)'],
                    "name": value.name,
                    "price": value.gia
                })
            })

            return res.status(200).json({ "data": data })
        })

    },
    //Thêm sản phẩm
    add: (req, res) => {

        try {

            const name = req.body.name
            const price = req.body.price
            const image = req.body.image
            const detail = req.body.detail
            const category_id = req.body.category_id

            const sql = "INSERT INTO products (name, price, image, detail, category_id) VALUES (?, ?, ?, ?, ?)"
            db.query(sql, [name, price, image, detail, category_id], (err) => {
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
            const id = req.body.id
            const name = req.body.name
            const price = req.body.price
            const detail = req.body.detail

            const sql = "UPDATE products SET name = ?, price = ?, detail = ? WHERE id = ?"
            db.query(sql, [name, price, detail, id], (err) => {
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
            // console.log(id)
            const sql = "DELETE FROM products WHERE id = ?"
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