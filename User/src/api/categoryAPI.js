import axios from "axios"

const host = "http://localhost:5000"
const categoryAPI = {
    get(){
        return axios.get(host + "/category") 
    }
}
export default categoryAPI