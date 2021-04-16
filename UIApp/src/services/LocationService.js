import http from "../http-common";

const get = (searchKey, limit) => {
  return http.get(`/locations?searchKey=${searchKey}&limit=${limit}`);
};

export default {
  get
};
