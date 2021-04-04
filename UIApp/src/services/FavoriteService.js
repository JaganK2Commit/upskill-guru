import http from "../http-common";

const getAll = () => {
  return http.get("/favorites");
};

const create = data => {
  return http.post("/favorites", data);
};

const update = (id, data) => {
  return http.put(`/favorites/${id}`, data);
};

const remove = id => {
  return http.delete(`/favorites/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
