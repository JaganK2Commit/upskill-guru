import axios from "axios";

const u = JSON.parse(localStorage.getItem('user'));
const token = (u) ? u.token : null

export default axios.create({
  // baseURL: "https://api.cs411upskillguru.web.illinois.edu/api",
  //baseURL: "http://localhost/api",
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + token,
    // "Authorization": "Bearer " + localStorage.getItem('token'),
    // "uid": localStorage.getItem('uid')
  }
});