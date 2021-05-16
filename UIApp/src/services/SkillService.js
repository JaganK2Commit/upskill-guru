import http from "../http-common";

const getAll = () => {
  return http.get("/skills");
};

const get = (id) => {
  return http.get(`/skills/${id}`);
};

const create = (data) => {
  return http.post("/skills", data);
};

const update = (id, data) => {
  return http.put(`/skills/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/skills/${id}`);
};

const removeAll = () => {
  return http.delete(`/skills`);
};

const findByTitle = (title) => {
  return http.get(`/skills?title=${title}`);
};

const findSuggestions = (searchKey, limit) => {
  return http.get(`/skills/getSuggested?searchKey=${searchKey}&limit=${limit}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findSuggestions,
};
