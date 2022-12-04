import axios from "axios"

const host = "http://localhost:5000"
const productAPI = {
    get() {
        return axios.get(host + "/products")
    },
    trend() {
        return axios.get(host + "/products_trend")
    },
    get_random(category_id) {
        return axios.get(host + "/r_products/" + category_id)
    },
    check_voucher(name){
        return axios.get(host + "/voucher/" + name)
    }
}
export default productAPI