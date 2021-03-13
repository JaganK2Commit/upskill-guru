import axios from "axios";

export default axios.create({
  baseURL: "https://cs411upskillguru.web.illinois.edu/api_v2",
  //baseURL: "http://localhost/api",
  headers: {
    "Content-type": "application/json"
  }
});
