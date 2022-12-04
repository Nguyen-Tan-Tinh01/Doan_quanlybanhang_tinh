import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


const levelAPI = {
    get() {
        return axios.get(host + "/level")
    },
    edit(data) {
        return axios.put(host + "/level", data, config)
    },
    add(data) {
        return axios.post(host + "/level", data, config)
    },
    del(id){
        return axios.delete(host + "/level/" + id)
    }
}
export default levelAPI