import axios from "axios"

const host = "http://localhost:5000"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const userAPI = {
    get() {
        return axios.get(host + "/user")
    }
}
export default userAPI