import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


const productAPI = {
    get() {
        return axios.get(host + "/products")
    },
    trend() {
        return axios.get(host + "/products_trend")
    },
    add(data) {
        return axios.post(host + "/products", data, config)
    },
    edit(data) {
        return axios.put(host + "/products", data, config)
    },
    del(id) {
        return axios.delete(host + "/products/" + id)
    }
}
export default productAPI