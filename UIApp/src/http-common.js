import axios from "axios";

export default axios.create({
  baseURL: "https://api.cs411upskillguru.web.illinois.edu/api",
  //baseURL: "http://localhost/api",
  headers: {
    "Content-type": "application/json"
  }
});
