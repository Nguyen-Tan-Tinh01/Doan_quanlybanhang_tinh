const db = require('../db')

//Số lượng bán ra của các ngày trong tuần

const SellNumber = (data, data_day, data_count, _index) => {
    [...Array(7).keys()].map((index) => {
        // console.log(index)
        const day = new Date(Date.now())
        day.setDate(day.getDate() - index)

        const options = { weekday: 'long' }
        const text_Day = new Intl.DateTimeFormat('vi-VN', options).format(day)

        // Nếu hôm đó tồn tại


        if (data[_index]) {
            //    console.log(data[index].date.toISOString().slice(0, 10), day.toISOString().slice(0, 10))
            //Kiêm tra có trùng ngày hay không
            if (data[_index].date.toISOString().slice(0, 10) === day.toISOString().slice(0, 10)) {
                data_day.push(text_Day)
                data_count.push(data[_index]['COUNT(*)'])
                _index += 1
            }
            else {
                data_day.push(text_Day)
                data_count.push(0)
            }

        } else {
            data_day.push(text_Day)
            data_count.push(0)
        }

        // console.log(data_count)
    })
}

module.exports = {
    //Thống kê số lượng sản phẩm - doanh thu - ...
    getHome: (req, res) => {
        const sql = `SELECT
        (SELECT COUNT(*) FROM products) as n_products, 
        (SELECT COUNT(*) FROM category) as n_category,
        (SELECT SUM(price) FROM cart WHERE cart.status = 1) as n_price,
        (SELECT COUNT(*) FROM cart WHERE cart.status = 1) as n_cart_success
        `

        //data : sản phẩm bán chạy
        db.query(sql, (err, response) => {
            if (err) throw err
            const sql = "SELECT *,COUNT(*) FROM cart INNER JOIN products ON products.id=cart.product_id WHERE cart.status = 1 GROUP BY cart.product_id ORDER BY COUNT(*) DESC LIMIT 10"
            db.query(sql, (err, res_products) => {
                if (err) throw err
                data = []
                res_products.map((value) => {
                    data.push({
                        "id": value.product_id,
                        "count": value['COUNT(*)'],
                        "name": value.name,
                        "price": value.sum_price,
                        "image": value.image
                    })
                })


                //Thống kê sản phẩm bán đươc trong tuần này theo ngày
                const sql = `SELECT COUNT(*), cart.date FROM cart INNER JOIN products 
                    ON products.id=cart.product_id WHERE cart.status = 1 
                        GROUP BY cart.date ORDER BY cart.date DESC LIMIT 7`

                db.query(sql, (err, sell_number) => {
                    if (err) throw err
                    // console.log(sell_number)
                    _sell_number = []
                    _sell_number2 = []
                    SellNumber(sell_number, _sell_number, _sell_number2, 0)

                    return res.status(200).json({
                        "statistical": {
                            "n_products": response[0].n_products,
                            "n_category": response[0].n_category,
                            "doanh_thu": response[0].n_price === null ? 0 : response[0].n_price,
                            "n_cart_success": response[0].n_cart_success === null ? 0 : response[0].n_cart_success
                        },
                        "data": data,
                        "sell": {
                            "sell_products_day": _sell_number,
                            "sell_products_count": _sell_number2
                        }
                    })
                })

            })


        })
    },
    getHeader: (req, res) => {
        const sql = `SELECT
            (SELECT COUNT(*) FROM products) as n_products, 
            (SELECT COUNT(*) FROM category) as n_category,
            (SELECT SUM(price) FROM cart WHERE cart.status = 1) as n_price,
            (SELECT COUNT(*) FROM cart WHERE cart.status = 1) as n_cart_success
            `

        //data : sản phẩm bán chạy
        db.query(sql, (err, response) => {
            if (err) throw err

            return res.status(200).json({
                "n_products": response[0].n_products,
                "n_category": response[0].n_category,
                "doanh_thu": response[0].n_price === null ? 0 : response[0].n_price,
                "n_cart_success": response[0].n_cart_success === null ? 0 : response[0].n_cart_success
            })


        })
    },
    get_random_products: (req, res) => {
        try {
            const id = req.params.id
            if (id === '-1') {
                const sql = "SELECT * FROM products ORDER BY RAND() LIMIT 10"
                db.query(sql, (err, _res) => {
                    if (err) return res.status(500).json("error")

                    data = []
                    _res.map((value) => {
                        data.push({
                            "id": value.id,
                            "name": value.name,
                            "image": value.image,
                            "price": value.price,
                            "detail": value.detail
                        })
                    })

                    return res.status(200).json(data)
                })
            }
            else {
                const sql = "SELECT * FROM products WHERE category_id = ? ORDER BY RAND() LIMIT 10"
                db.query(sql, [id], (err, _res) => {
                    if (err) return res.status(500).json("error")

                    data = []
                    _res.map((value) => {
                        data.push({
                            "id": value.id,
                            "name": value.name,
                            "image": value.image,
                            "price": value.price,
                            "detail": value.detail
                        })
                    })

                    return res.status(200).json(data)
                })
            }
        } catch (error) {
            return res.status(500).json("error")
        }
    }
}