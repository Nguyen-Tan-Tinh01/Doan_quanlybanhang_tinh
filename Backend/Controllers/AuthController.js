const db = require('../db')

const get_level = () => {
    return new Promise((resolve) => {
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
            return resolve(data)
        })
    })
}

const check_level = (data, sum_price, sum_cart) => {
    return new Promise((resolve) => {
        level = 0
        data.map((value, index) => {
            if (sum_price < value.condition_min_price || sum_cart < value.condition_number_cart) {
                return resolve([data[level].name, data[level].discount])
            }
            level = index
        })
        // console.log(data[level])
        return resolve([data[level].name, data[level].discount])
    })
}

const get_cart = (id) => {
    return new Promise((resolve) => {
        const sql = "SELECT price FROM cart WHERE user_id = ? AND status = 1"

        db.query(sql, [id], (err, res) => {
            if (err) throw err
            sum = 0
            res.map((value) => {
                sum += value.price
            })
            return resolve({
                number_cart: res.length,
                sum_price: sum
            })
        })
    })
}
module.exports = {

    login: (req, res) => {
        data = req.body
        //ấy username và password nguoi dung truyen len
        username = data.username
        password = data.password

        const sql = "SELECT * FROM user WHERE username = ? AND password = ?"
        db.query(sql, [username, password], async (err, response) => {
            if (err) return res.status(500).json({ "login": "err" })
            if (response[0]) {


                const sql = "SELECT * FROM user WHERE id = ?"
                const level = await get_level()

                db.query(sql, [response[0].id], async (err, _res) => {
                    if (err) return res.status(500).json("error")

                    value = _res[0]
                    const count = await get_cart(response[0].id)
                    _level = await check_level(level, count.sum_price, count.number_cart)
                    console.log(_level)
                    input_level = {
                        level: _level[0],
                        discount: _level[1]

                    }

                    return res.status(200).json({
                        "id": response[0].id,
                        "name": response[0].name,
                        "level": input_level
                    })

                })
            }
            else
                return res.status(404).json({ "login": "err" })
        })
    },
    register: (req, res) => {
        try {
            data = req.body
            username = data.username
            password = data.password

            //Kiểm tra tên tài khoản tồn tại hay chưa
            const sql = "SELECT * FROM user WHERE username = ?"
            db.query(sql, [username], (err, _res) => {
                if (err) return res.status(500).json({ "login": "err" })
                if (_res[0])
                    return res.status(404).json({ "login": "err" })

                const sql = "INSERT INTO user (username, password) VALUES (?, ?)"
                db.query(sql, [username, password], (err) => {
                    if (err) return res.status(500).json({ "login": "err" })
                    return res.status(200).json('success')
                })
            })
        } catch (error) {
            return res.status(500).json({ "login": "err" })
        }
    }
}