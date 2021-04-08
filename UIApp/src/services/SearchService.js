import http from "../http-common";

const get = () => {
  return http.get("/search");
};

export default {
  get
};
