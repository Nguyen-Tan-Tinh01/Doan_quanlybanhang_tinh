import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


const voucherAPI = {
    get() {
        return axios.get(host + "/voucher")
    },
    add(data) {
        return axios.post(host + "/voucher", data, config)
    },
    del(id) {
        return axios.delete(host + "/voucher/" + id)
    },
    check(name) {
        return axios.get(host + "/voucher/" + name)
    }
    // edit(data) {
    //     return axios.put(host + "/cart", data, config)
    // },
}
export default voucherAPI