import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


const productAPI = {
    get() {
        return axios.get(host + "/cart")
    },
    edit(data) {
        return axios.put(host + "/cart", data, config)
    },
    del(id) {
        return axios.delete(host + "/cart/" + id)
    },
    add(data) {
        return axios.post(host + "/cart", data, config)
    }
    // trend() {
    //     return axios.get(host + "/products_trend")
    // },
    // add(data) {
    //     return axios.post(host + "/products", data, config)
    // },
    // edit(data) {
    //     return axios.put(host + "/products", data, config)
    // },
    // del(id) {
    //     return axios.delete(host + "/products/" + id)
    // }
}
export default productAPI