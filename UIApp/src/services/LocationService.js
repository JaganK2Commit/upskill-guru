import http from "../http-common";

const get = (searchKey) => {
  return http.get(`/locations?searchKey=${searchKey}`);
};

export default {
  get
};
