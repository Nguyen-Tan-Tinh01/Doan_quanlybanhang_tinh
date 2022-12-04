import axios from "axios"

const host = "http://localhost:5000"

const homeAPI = {
    home() {
        return axios.get((host + "/home"))
    },
    statistical() {
        return axios.get((host + "/home/statistical"))
    }


}
export default homeAPI