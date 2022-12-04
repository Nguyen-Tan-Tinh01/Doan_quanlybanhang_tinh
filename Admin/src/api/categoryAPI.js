import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


const productAPI = {
    get() {
        return axios.get(host + "/category")
    },
    add_02(data) {
        return axios.post(host + "/category_02", data, config)
    },
    edit_02(data) {
        return axios.put(host + "/category_02", data, config)
    },
    del_02(id) {
        return axios.delete(host + "/category_02/" + id)
    },
    edit(data) {
        return axios.put(host + "/category", data, config)
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