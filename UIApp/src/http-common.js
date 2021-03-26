import axios from "axios";

export default axios.create({
  // baseURL: "https://api.cs411upskillguru.web.illinois.edu/api",
  //baseURL: "http://localhost/api",
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('token')
  }
});
