import http from "../http-common";

const get = (searchKey) => {
  return http.get(`/search?searchKey=${searchKey}`);
};

const getRelevantSkillSet = (searchKey) => {
  return http.get(`/search/getRelevantSkillSet?searchKey=${searchKey}`);
};

export default {
  get,
  getRelevantSkillSet
};
