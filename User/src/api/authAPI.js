import axios from "axios"

const host = "http://localhost:5000"

const authAPI = {
    login(username, password){
        return axios.post((host + "/login"), {
            "username": username,
            "password":password 
        })
    },
    register(username, password){
        return axios.post((host + "/register"), {
            "username": username,
            "password":password 
        })
    }
}
export default authAPI