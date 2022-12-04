const db = require('../db')

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
                return resolve(data[level].name)
            }
            level = index
        })
        return resolve(data[level].name)
    })
}
module.exports = {
    get: async (req, res) => {
        try {
            const sql = "SELECT * FROM user"
            const level = await get_level()

            db.query(sql, async (err, _res) => {
                if (err) return res.status(500).json("error")

                const data = _res.map(async (value) => {
                    const count = await get_cart(value.id)
                    return ({
                        id: value.id,
                        username: value.username,
                        count: count,
                        level: await check_level(level, count.sum_price, count.number_cart)

                    })
                })
                const _data = await Promise.all(data)

                res.status(200).json({ data: _data })
            })
        } catch (error) {
            return res.status(500).json("error")
        }

    }
}