import http from "../http-common";

const get = (searchKey) => {
  return http.get(`/search?searchKey=${searchKey}`);
};

export default {
  get
};
